// menggunakan library: multer
const multer = require('multer')
const fs = require('fs') // unutk menggunakan file diluar (export/import)

module.exports = {
    uploader: (directory, fileNamePrefix) => {
        // filename prefix: key yang dicocokan dengan yang ada pada front end
        // directory: tempat

        // kalau directory tidak diisi, maka langsung masuk ke folder publix
        let defaultDir = './public'
        // Disk storage: menyimpan file dari front end ke direktori lokal backend
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                // kalau tidak di define, maka disimpan ke folder public
                const pathDir = directory ? defaultDir + directory : defaultDir

                // melakukan pegecekan direktori pada local BE / API
                if (fs.existsSync(pathDir)) {
                    // Jika ada, pathDir akan direturn oleh cb
                    console.log("Directory Exist!✅")
                    cb(null, pathDir)
                } else {
                    // Jika tidak ada, maka direktori akan dibuat
                    fs.mkdir(pathDir, { recursive: true }, error => cb(error, pathDir))
                    console.log("Direktori success created✅✅")
                }
            },
            filename: (req, file, cb) => {
                // memberinama file, membantu juga untuk melakukan pengecekan
                let ext = file.originalname.split('.')
                let filename = fileNamePrefix + Date.now() + '.' + ext[ext.length - 1]
                cb(null, filename)
            }
        })

        const fileFilter = (req, file, cb) => {
            // extension file yang diperbolehkan untuk disimpan
            const ext = /\.(jpg|png|pdf|docx|gif|xlsx|txt)/ig

            if (!file.originalname.match(ext)) {
                return cb(new Error('Your file type are denied'), false)
            }

            cb(null, true)
        }

        return multer({ storage, fileFilter })
    }
}