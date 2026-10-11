const http = require('http');

const student = {
    name: 'Rusanov Nichita',
    group: 'IAFR-2302',
    speciality: 'Applied Informatics'
};

const courses = [
    { name: 'Web Technologies', teacher: 'Petrov P.P.', credits: 3 },
    { name: 'Databases', teacher: 'Sidorov S.S.', credits: 4 },
    { name: 'Programming', teacher: 'Ivanova I.I.', credits: 5 }
];

const quotes = [
    'Learning is light, and ignorance is darkness.',
    'Repetition is the mother of learning.',
    'Knowledge is power.'
];

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const server = http.createServer((req, res) => {
    const now = new Date();
    console.log(`${req.method} ${req.url} | ${formatDate(now)}`);

    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Welcome! This is my first Node.js server.');
    } else if (req.method === 'GET' && req.url === '/about') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('This application was created as part of Lab Work #1 on Node.js.');
    } else if (req.method === 'GET' && req.url === '/student') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Student: ${student.name}\nGroup: ${student.group}\nSpeciality: ${student.speciality}`);
    } else if (req.method === 'GET' && req.url === '/api/student') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(student));
    } else if (req.method === 'GET' && req.url === '/time') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Current date and time: ${formatDate(now)}`);
    } else if (req.method === 'GET' && req.url === '/api/courses') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(courses));
    } else if (req.method === 'GET' && req.url === '/api/quote') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.end(JSON.stringify({ quote: randomQuote }));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('404 - Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
