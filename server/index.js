import express from 'express';
import cors from 'cors';
import courses from './courses.json' with { type: 'json' };
import students from './students.json' with { type: 'json' };
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors(
  {
    origin: ['http://localhost:3000', 'https://alameno-task.onrender.com', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200,
  }
));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  console.log(res.getHeaders())
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(course => course.id === courseId);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(student => student.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.post('/api/like/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const studentId = parseInt(req.body.studentId);
  const course = courses.find(course => course.id === courseId);
  if (course) {
    if (!course.likes.includes(studentId)) {
      course.likes.push(studentId);
    }
    fs.writeFile('./courses.json', JSON.stringify(courses, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save data' });
      }
      res.json(course);
    });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.post('/api/removeLike/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const studentId = parseInt(req.body.studentId);
  const course = courses.find(course => course.id === courseId);
  if (course) {
    if (course.likes.includes(studentId)) {
      course.likes = course.likes.filter(id => id!== studentId);
    }
    fs.writeFile('./courses.json', JSON.stringify(courses, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save data' });
      }
      res.json(course);
    });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
