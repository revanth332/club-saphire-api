require('./node_modules/dotenv/config')
const express = require('express');
const app = express()
const cors = require('cors');
const {connectDB,responseModel } = require('./database')
const PORT = 5000
const csvParser = require("json2csv").parse;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:["http://127.0.0.1:5500/Club%20Sapphire/feedback.html",process.env.FRONTEND_URL]
}))

app.post("/addresponse",(req,res)=>{
    const responseData = {
        Name : req.body.name,
        Regdno : req.body.regdno,
        Gender : req.body.gender,
        Enjoyable:req.body.events,
        Promoted:req.body.characters,
        Accommodation:req.body.Accomodation,
        WelcomeFormality:req.body.WelcomeFormality,
        MailCommunication:req.body.MailCommunication,
        Transportation:req.body.Transportation,
        Venue:req.body.Venue,
        Activities:req.body.Activities,
        Speakers:req.body.Speakers,
        Rating:req.body.rating,
        Future:"YES"
    }
    const response = new responseModel(responseData);
    response.save().then((item)=>{
        res.status(200).sendFile(__dirname+"/confirm.html");
    }).catch((err)=>{
        res.status(400).end();
    })
})
app.get("/hello",(req,res)=>{
    res.end("hello");
})
app.get("/getresponse",async (req,res)=>{
    try{
        let responses = [];
        let responseData = await responseModel.find({});
        responseData.forEach((response) => {
            const {Name,
                Regdno,
                Gender,
                Enjoyable,
                Promoted,
                Accommodation,
                WelcomeFormality,
                MailCommunication,
                Transportation,
                Venue,
                Activities,
                Speakers,
                Rating,
                Future} = response;

            responses.push({Name,
                Regdno,
                Gender,
                Enjoyable,
                Promoted,
                Accommodation,
                WelcomeFormality,
                MailCommunication,
                Transportation,
                Venue,
                Activities,
                Speakers,
                Rating,
                Future});
        })
        const csvFields = [
            { label: 'Name', value: 'Name' },
            { label: 'Regd No', value: 'Regdno' },
            { label: 'Gender', value: 'Gender' },
            { label: 'What events did you find the most useful or enjoyable?', value: 'Enjoyable' },
            { label: 'Participation in the events of CLUB SAPPHIRE promoted the following', value: 'Promoted' },
            { label: 'How satisfied were you with the logistics? [Accommodation]', value: 'Accommodation' },
            { label: 'How satisfied were you with the logistics? [Welcome Formality]', value: 'WelcomeFormality' },
            { label: 'How satisfied were you with the logistics? [Mail Communication]', value: 'MailCommunication' },
            { label: 'How satisfied were you with the logistics? [Transportation]', value: 'Transportation' },
            { label: 'How satisfied were you with the logistics? [Venue]', value: 'Venue' },
            { label: 'How satisfied were you with the logistics? [Activities]', value: 'Activities' },
            { label: 'How satisfied were you with the logistics? [Speakers]', value: 'Speakers' },
            { label: 'Overall, how would you rate the event?', value: 'Rating' },
            { label: 'Would you like to hear about similar events in the future?', value: 'Future' },
          ];
          
            const csvData = csvParser(responses,{fields:csvFields});

            res.setHeader("Content-type","text/csv");
            res.attachment("Responses.csv");
            res.status(200).end(csvData);
    }
    catch(error){
        res.send({status:400,success:false,msg:error.message});
    }
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening at port ${PORT}`);
    })
})

