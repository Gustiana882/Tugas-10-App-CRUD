const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// koneksi mysql
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arkademy'
});
conn.connect((err) => {
    if(err) throw err;
    console.log('mysql connected..');
});

// gunakan ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    let sql = 'select * from produk';
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.render('main',{
            results : results
        })
    })
});

app.get('/produk/:id',(req, res) => {
    let sql = 'select * from produk where id='+req.params.id;
    //console.log(req.params.id);
    let query = conn.query(sql,(err, results)=>{
        if(err) throw err;
        res.send(JSON.stringify(results));
    })
})

app.post('/tambah', (req, res) => {
    let data = {
        nama_produk : req.body.nama,
        keterangan : req.body.keterangan,
        harga : req.body.harga,
        jumlah : req.body.jumlah
    }
    let sql = 'insert into produk set ?';
    let query = conn.query(sql, data, (err, ress) => {
        if(err) throw err;
        res.redirect('/')
    })
});

app.post('/ubah', (req, res) => {
    let data = {
        id : req.body.id,
        nama_produk : req.body.nama,
        keterangan : req.body.keterangan,
        harga : req.body.harga,
        jumlah : req.body.jumlah
    }
    let sql = 'update produk set ? where id='+req.body.id;
    let query = conn.query(sql, data, (err, ress) => {
        if(err) throw err;
        res.redirect('/')
    })
});

app.get('/hapus/:id',(req, res) => {
    let sql = 'delete from produk where id='+req.params.id;
    //console.log(req.params.id);
    let query = conn.query(sql,(err, results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});