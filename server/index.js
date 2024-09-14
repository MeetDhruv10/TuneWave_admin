
const express = require('express');
const { connectToDB } = require('./configuration/database');
const userModel = require('./model/user.model');
const PlaylistModel = require('./model/Playlist.model');
const SongsModel = require('./model/Songs.model');
const ArtistsModel = require('./model/Artists.model');
const AlbumsModel = require('./model/Albums.model');
const cors = require('cors');
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const DeletionLog = require( "./model/Stats.model");
dotenv.config();

const bucketName = process.env.BUCKET_NAME
const bucketRegion= process.env.BUCKET_REGION 
const accessKey = process.env.ACCESS_KEY 
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client(
    {
        credentials:{
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey,
        },
        region: bucketRegion,
    }); 
    console.log(s3)

const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const port = 3000;
app.use(cors())
app.use(express.json())



// for adding an artist
app.post('/addArtist', upload.single('image'), async(req, res) => {
    try{
      let name = req.body.Name
      name = name.replace(' ','-')
    const params = {
        Bucket: bucketName,
        Key: `${name}-${req.body.DOB.slice(0,10)}.${req.file.originalname.split('.').pop()}` ,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)
    const artist = new ArtistsModel({
        Name : req.body.Name,
        Biography : req.body.Biography,
        DOB : req.body.DOB,   
        photo :`${name}-${req.body.DOB.slice(0,10)}.${req.file.originalname.split('.').pop()}`
})
    await artist.save();
    res.send('artist added');

}catch(err){
    console.log(err);
}
})

//for fetching artists
app.get('/searchArtist', async (req, res) => {
    try {
      const artists = await ArtistsModel.find(); // Fetch all artists
      res.json(artists);
    } catch (err) {
      console.error('Error fetching artists:', err);
      res.status(500).send('Server error');
    }
  });

  app.get('/artistsimage',async(req,res) => {
    try{
      const artists = await ArtistsModel.find();
      let data = artists.map((element,idx)=>{
        return element.photo
      })
      res.json({
        'artistsLinks':data,
      });

    
    }
    catch (err) {
      console.error('Error fetching artists:', err);
        res.status(500).send('Server error');
      }

  });


// adding a user via Flutter frontend 
app.post('/addUser', async (req, res) => {
    try {
        console.log(req.body);

        // Convert DOB from string to Date object
        const dob = new Date(req.body.DOB);
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Check if the phone number already exists
        const existingUser = await userModel.findOne({ Phone_Number: req.body.Phone_Number });
        if (existingUser) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        // Create a new user object with the provided data
        const user = new userModel({
            User_Name: req.body.User_Name,
            Phone_Number: req.body.Phone_Number,
            DOB: dob,
        });

        // Save the user to the database
        await user.save();

        // Send a success response
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});

//for deleting an artist
app.post('/deleteArtist',async (req,res)=>{
    try {
        console.log('artist id:',)
        const { id } = req.body;
        const artist = await ArtistsModel.findById(id)
        const params = {
            Bucket: bucketName,
            Key: artist.photo ,
        }


        await DeletionLog.create({
            deletedAt: new Date()
          });
      
          
        const command = new DeleteObjectCommand(params)
        await s3.send(command)
        await artist.deleteOne();
        res.status(200).json(artist);
    } catch (error) {console.error('Error deleting artist:', error);
        res.status(500).json({ message: 'Error deleting artist' });
    }
})

app.get('/artistStats', async (req, res) => {
    try {
        const monthlyCounts = await ArtistsModel.aggregate([
            {
              $group: {
                _id: { $month: "$createdAt" }, 
                count: { $sum: 1 }            
              }
            }
          ]);
        
          const countsArray = Array(12).fill(0);
        

          monthlyCounts.forEach(({ _id, count }) => {
            countsArray[_id - 1] = count; 
          });



          const monthlyDeletions = await DeletionLog.aggregate([
            {
              $group: {
                _id: { $month: "$deletedAt" }, 
                count: { $sum: 1 }             
              }
            }
          ]);
        

          const deletionsArray = Array(12).fill(0);
        

          monthlyDeletions.forEach(({ _id, count }) => {
            deletionsArray[_id - 1] = count; 
          });



          res.json({
            createdCount : countsArray,
            deletedCount : deletionsArray,
          });

    } catch (err) {
      console.error('Error fetching artist stats:', err);
      res.status(500).send('Server error');
    }
  });
//   app.post('/addSong', upload.multiple('songs'), async(req, res) => {
//     try{
//     const params = {
//         Bucket: bucketName,
//         Key: `${req.body.Name}-${req.body.DOB.slice(0,10)}.${req.file.originalname.split('.').pop()}` ,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//     }
//     const command = new PutObjectCommand(params)
//     await s3.send(command)
//     const artist = new ArtistsModel({
//         Name : req.body.Name,
//         Biography : req.body.Biography,
//         DOB : req.body.DOB,   
//         photo :`${req.body.Name}-${req.body.DOB.slice(0,10)}.${req.file.originalname.split('.').pop()}`
// })
//     await artist.save();
//     res.send('Song added');

// }catch(err){
//     console.log(err);
// }
// })



app.listen(port, () => {
    connectToDB();
    console.log(`Server is running on port http://localhost:${port}`);
});

