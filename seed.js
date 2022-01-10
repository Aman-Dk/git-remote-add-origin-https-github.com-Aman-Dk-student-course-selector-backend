const Student = require('./models/student')
// const { v4: uuid } = require('uuid');

const students = [
    {
        id:'1',
        name:'Daisy',
        course:'BTECH'
    },
    {   id:'2',
        name:'Jack',
        course:'BSC'
    },
    {   id:'3',
        name:'Jasper',
        course:'BIOTECH'
    },
    {   id:'4',
        name:'Julie',
        course:'BA'
    },
    {   id:'5',
        name:'Emma',
        course:'MBA'
    },
    {   id:'6',
        name:'Jane',
        course:'MTECH'
    },
    {   id:'7',
        name:'Jerry',
        course:'MBBS'
    },
    {   id:'8',
        name:'Kevin',
        course:'ELECTRICAL'
    },
    {   id:'9',
        name:'Dwayne',
        course:'BIOTECH'
    },
    {   id:'10',
        name:'Jimmy',
        course:'AUTOMOBILE'
    },
    {   id:'11',
        name:'Rick',
        course:'MECHANICAL'
    }
]


const seedDb = async() =>{
    await Student.insertMany(students)
    console.log('db seeded')
}

module.exports = seedDb 