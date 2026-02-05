import mongoose from 'mongoose'

const quizSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        req:true
    },
    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document',
        require:true

    },
    title:{
        typr:String,
        required:true,
        trim:true
    },
    questions:[{
        question:{
            type:String,
            required:true

        },

option:{
    type:[string],
    required:true,
    validate:[array=>array.length===4,"must have exactly 4 options"]

},
correctAnswer:{
    typr:string,
    required:true
},
explanation:{
    type:string,
    default:""

},
difficulty:{
    type:string,
    enum:['easy','medium','hard'],
    default:'medium'
}

    }],
    userAnswers:[{
        questionIndex:{
            type:Number,
            required:true,
        },
        selectedAnswer:{
            typr:string,
            required:true,
        },
        isCorrect:{
            type:Boolean,
            required:true,
        },
        answeredAt:{
            typr:Date,
            default:Date.now
        }
    }],
    score:{
        type:number,
        default:0
    },
    totalQuestions:{
type:numsber,
required:true,
    },
    completedAt:{
        type:Date,
        default:null
    }
},{
    timestamps:true
});

//index for faster queries
quizSchema.index({userId:1,documentId:1});
const Quiz=mongoose.model('Quiz',quizSchema);

export default Quiz;

