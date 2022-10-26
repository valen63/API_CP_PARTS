const Components = require('../model/Components.js');
const axios = require("axios");
function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}


const getAll = async (req, res, next) => {
  try {
    const AllComponents = await Components.find()
    if (AllComponents.length < 2000) {
      await axios.get(`https://top-computer-parts.p.rapidapi.com/cpu?rapidapi-key=${process.env.KEY}`).then((resp) => {
        let info = resp.data.filter((e, i) => i !== 0).sort(() => random(-1, 1)).splice(0, 500)
        info.map(async (e, i) => {
          let data = e.split(",")
          let precio = data[2] === "Intel" ? random(300, 1100) : data[2] === "AMD" ? random(100, 1380) : 0;
          if (i !== 0 && data[2] !== "" && data[0] !== "") {
            let item = new Components({
              Type: data[0], code: data[1], Brand: data[2], Model: data[3],
              Price: `USD ${precio}`,
              Img: data[2] === "Intel" ? "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg" : data[2] === "AMD" ? "https://www.pcworld.com/wp-content/uploads/2022/05/ryzen-cpu-promo-shot.jpg?quality=50&strip=all" : "https://concepto.de/wp-content/uploads/2014/08/CPU-e1551228069783-800x400.jpg",
              Benchmark: data[5], Samples: parseInt(data[6])-random(0, parseInt(data[6])),
            })
            item ? await item.save() : null
          }
        })
      })
      await axios.get(`https://top-computer-parts.p.rapidapi.com/gpu?rapidapi-key=${process.env.KEY}`).then((resp) => {
        let info = resp.data.filter((e, i) => i !== 0).sort(() => random(-1, 1)).splice(0, 500)
        info.map(async (e, i) => {
          let data = e.split(",")
          if (i !== 0 && data[2] !== "" && data[0] !== "") {
            let item = new Components({
              Type: data[0], code: data[1], Brand: data[2], Model: data[3],
              Price: `USD ${random(200, 2000)}`,
              Img: (data[2].includes("RTX") || data[2] === "Nvidia" || data[1] === "Nvidia") ? "https://s3.amazonaws.com/cms.ipressroom.com/219/files/201711/NGC-On-Titan-4K.PNG" : data[1] === "AMD" ? "https://www.amd.com/system/files/2020-10/579976-amd-radeon-6000-series-ryzen-logos-1260x709_0.jpg" : data[2] === "Asus" ? "https://http2.mlstatic.com/D_NQ_NP_726886-MLA44643218428_012021-O.webp" : data[2] === "Gigabyte" ? "https://pcgamercatamarca.com.ar/wp-content/uploads/2022/04/gigabyte-1660-oc-6g-scaled.jpg" : data[2] === "EVGA" ? "https://i0.wp.com/www.pcmrace.com/wp-content/uploads/2022/09/EVGA-HERO.jpg?resize=750%2C400&ssl=1" : data[2] === "Zotac" ? "https://http2.mlstatic.com/D_NQ_NP_659938-MLA51558829194_092022-O.jpg" : data[2] === "MSI" ? "https://asset.msi.com/resize/image/global/product/five_pictures6_3470_201509231418445602444492ee3.png62405b38c58fe0f07fcef2367d8a9ba1/400.png" : "https://signal.avg.com/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/How%20to%20Overclock%20Your%20GPU%20for%20More%20Gaming%20and%20Multimedia%20Performance/How_to_Overclock_Your_GPU-Hero.jpg",
              Benchmark: data[5], Samples: parseInt(data[6])-random(0, parseInt(data[6])),
            })
            item ? await item.save() : null
          }

        })

      })
      await axios.get(`https://top-computer-parts.p.rapidapi.com/ram?rapidapi-key=${process.env.KEY}`).then((resp) => {
        let info = resp.data.filter((e, i) => i !== 0).sort(() => random(-1, 1))
        let precio =
          info.map(async (e, i) => {
            let data = e.split(",")
            if (i !== 0 && data[2] !== "" && data[0] !== "") {
              let item = new Components({
                Type: data[0], code: data[1], Brand: data[2], Model: data[3],
                Price: `USD ${random(15, 200)}`,
                Img: data[2] === "G.SKILL" ? "https://d2r9epyceweg5n.cloudfront.net/stores/001/120/045/products/151-e817be8c2364e03d6d15955859686447-640-0.png" : data[2] === "Crucial" ? "https://www.crucial.com/content/dam/crucial/dram-products/laptop/images/product/crucial-ddr4-sodimm-kit-2.psd.transform/medium-png/image.png" : data[2] === "Corsair" ? "https://s3-sa-east-1.amazonaws.com/saasargentina/f939foKj3jFJzkn9zrjm/imagen" : data[2] === "HyperX" ? "https://http2.mlstatic.com/D_NQ_NP_907637-MLA40927047878_022020-O.webp" : "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2016/01/142527-todo-que-necesitas-saber-memoria-ram.jpg",
                Benchmark: data[5], Samples: parseInt(data[6])-random(0, parseInt(data[6])),
              })
              item ? await item.save() : null
            }
          })

      })
      await axios.get(`https://top-computer-parts.p.rapidapi.com/ssd?rapidapi-key=${process.env.KEY}`).then((resp) => {
        let info = resp.data.filter((e, i) => i !== 0).sort(() => random(-1, 1)).splice(0, 500)
        info.map(async (e, i) => {
          let data = e.split(",")
          if (i !== 0 && data[2] !== "" && data[0] !== "") {
            let item = new Components({
              Type: data[0], code: data[1], Brand: data[2], Model: data[3],
              Price: `USD ${random(35, 500)}`,
              Img: data[2] === "WD" ? "https://d2r9epyceweg5n.cloudfront.net/stores/002/278/419/products/wds100t1xhe1-0938c718082b9c62e316614499452443-480-0.jpg" : data[2] === "Intel" ? "https://http2.mlstatic.com/D_NQ_NP_946072-MLA31612801132_072019-V.jpg" : data[2] === "Gigabyte" ? "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/hd-ssd-240gb-gigabyte-sata-iii-25-0.jpg" : data[2] === "Corsair" ? "https://http2.mlstatic.com/D_NQ_NP_905087-MLA40377817860_012020-O.webp" : data[2] === "Samsung" ? "https://tienda.starware.com.ar/wp-content/uploads/2021/02/disco-solido-ssd-samsung-860-evo-2tb-sata-iii-25p-2287-3303.jpg" : data[2] === "Crucial" ? "https://www.clarin.com/img/2018/06/22/rypFmx9ZX_1256x620__1.jpg" : data[2] === "HP" ? "https://www.gizcomputer.com/wp-content/uploads/2019/07/HP-S700.jpg" : "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2018/05/claves-comprar-disco-duro-tu-pc_1.jpg?itok=x2OevEKz",
              Benchmark: data[5], Samples: parseInt(data[6])-random(0, parseInt(data[6])),
            })
            item ? await item.save() : null
          }
        })
      })
      await axios.get(`https://top-computer-parts.p.rapidapi.com/hdd?rapidapi-key=${process.env.KEY}`).then((resp) => {
        let info = resp.data.filter((e, i) => i !== 0).sort(() => random(-1, 1)).splice(0, 500)
        info.map(async (e, i) => {
          let data = e.split(",")
          if (i !== 0 && data[2] !== "" && data[0] !== "")
            var item = new Components({
              Type: data[0], code: data[1], Brand: data[2], Model: data[3],
              Price: `USD ${random(50, 250)}`,
              Img: data[2] === "WD" ? "https://images.fravega.com/f300/0c05dff5ecbb6f02539026156cfe876e.jpg" : data[2] === "Seagate" ? "https://www.seagate.com/www-content/product-content/internal-hard-drives/_shared/images/internal-hdd-rescue-502x177.png" : data[2] === "HGST" ? "https://images.anandtech.com/doci/8238/hgst_c10k1800_678x452.png" : data[2] === "Toshiba" ? "https://ae01.alicdn.com/kf/HTB1gYrPjsrI8KJjy0Fhq6zfnpXax/Toshiba-Hard-Disk-Portable-1TB-2TB-3TB-4TB-HDD-External-Hard-Drive-1-TB-2-TB.jpg_Q90.jpg_.webp" : "https://www.crucial.mx/content/dam/crucial/articles/about-ssd/ssd-vs-hdd-which-is-better-for-you/hard-drive.jpg.transform/large-jpg/img.jpg",
              Benchmark: data[5], Samples: data[6],
            })
          item ? await item.save() : null
        })
      })
      await axios.get(`https://top-computer-parts.p.rapidapi.com/usb?rapidapi-key=${process.env.KEY}`).then((resp) => {
        let info = resp.data.filter((e, i) => i !== 0).sort(() => random(-1, 1)).splice(0, 500)
        info.map(async (e, i) => {
          let data = e.split(",")
          if (i !== 0 && data[2] !== "" && data[0] !== "") {
            {
              let item = new Components({
                Type: data[0], code: data[1], Brand: data[2], Model: data[3],
                Price: `USD ${random(5, 50)}`,
                Img: data[2] === "Mushkin" ? "http://www.poweredbymushkin.com/Home/media/djcatalog2/images/mulholland-2gb-usb-flash-drive.3_f.jpg" : data[2] === "Corsair" ? "https://compraloencuotas.com.ar/aplicacion_agro_filedata/siga_webturismo/ecommerce_pictures/5426/shome_0000000000414636000176466414634--3-.jpg" : data[2] === "SanDisk" ? "https://http2.mlstatic.com/D_NQ_NP_886261-MLA41108503401_032020-O.webp": data[2] === "Kingston" ? "https://http2.mlstatic.com/D_NQ_NP_639470-MLA48454113137_122021-O.jpg": data[2] === "Apricorn" ? "https://m.media-amazon.com/images/I/51oECHkBYoL.jpg": data[2] === "Lexar" ? "https://m.media-amazon.com/images/I/71ACoQ3U-WL.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpPrnNduPkQH7Djvzz3lAGOskecpmkY49gmY6wa9WgMERLm_W6bKNgeHHNfAx_9-m7ciE&usqp=CAU",
                Benchmark: data[5], Samples: parseInt(data[6])-random(0, parseInt(data[6])),
              })
              item ? await item.save() : null
            }
          }
        })
      })
      let AllComponents2 = await Components.find()
      res.send(AllComponents2.sort(() => random(-1, 1)))
    }
    else res.send(AllComponents.sort(() => random(-1, 1)))
  }
  catch (err) {
    return res.status(500).send({ info: err.message, success: false })
  }
}

// const login = async (req, res, next) => {
//   const { email, password } = req.body

//   if (!email || !password) return res.status(400).send({ info: 'Por favor provea un email y contraseña', success: false })

//   try {
//     const user = await User.findOne({ email })
//     if (!user) return res.status(400).send({ info: 'Credenciales Invalidas', success: false })//return next(new ErrorResponse('Credenciales Invalidas', 401, false))
//     // if (!user.estado) return res.status(401).send({ info: 'Usuario baneado permanentemente', success: false })
//     // if (new Date().toString().slice(4, 24) < user.timeBanned) return res.send({ info: `Usuario baneado hasta ${user.timeBanned}`, success: false, user })
//     const match = await user.matchPassword(password)

//     if (!match) return res.status(400).send({ info: 'Credenciales Invalidas', success: false })
//     const token = user.generateToken()
//     res.send({ info: 'Credenciales correctas', success: true, token, user })
//   } catch (err) {
//     return res.status(400).send({ info: 'Credenciales Invalidas', success: false })
//   }
// }

// const forgotPassword = async (req, res, next) => {
//   const { email } = req.body
//   try {
//     const user = await User.findOne({ email })
//     if (!email) return res.status(400).send({ info: 'Por favor provea un email', success: false })
//     const resetToken = user.generateTokenResetPassword()
//     await user.save()

//     const resetURL = `${process.env.FRONT_URL}/password_reset/${resetToken}`
//     try {
//       Password(resetURL, email)
//       res.send({ info: 'Se ha enviado un email con instrucciones para resetear la contraseña', success: true })
//     } catch (err) {
//       user.resetPasswordToken = undefined
//       user.resetPasswordExpire = undefined
//       await user.save()
//       console.log(err)
//       res.status(500).send({ info: 'Error al enviar el email', success: false }).end()
//     }
//   } catch (err) {
//     res.status(400).send({ info: 'Error al encontrar el usuario y generar el token', success: false }).end()
//   }
// }

// const resetPassword = async (req, res, next) => {
//   const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
//   try {
//     const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
//     if (!user) return res.status(400).send({ info: 'Token Invalido', success: false }).end()
//     user.password = req.body.password
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpire = undefined
//     await user.save()
//     res.send({ info: 'Change!', success: true, user })
//   } catch (err) {
//     res.status(400).send({ info: 'Error al resetear la contraseña', success: false }).end()
//   }
// }

// const googleLogin = async (req, res) => {
//   try {
//     const { tokenId } = req.body
//     const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

//     const { email_verified, email, name, picture } = verify.payload
//     const password = email + process.env.GOOGLE_SECRET

//     if (!email_verified) return res.status(400).json({ info: 'Email verification failed.', success: false })

//     const user = await User.findOne({ email })

//     if (user) {
//       const match = await user.matchPassword(password)
//       if (!match) return res.status(400).json({ info: 'Password is incorrect.', success: false })
//       // if (!user.estado) return res.status(401).send({ info: 'Usuario baneado permanentemente', success: false })
//       // if (new Date().toString().slice(4, 24) < user.timeBanned) return res.send({ info: `Usuario baneado hasta ${user.timeBanned}`, success: false, user })
//       const token = user.generateToken()

//       res.send({ info: 'Login success!', success: true, token, user })
//     } else {
//       const newUser = new User({
//         name, email, password, Image: picture
//       })
//       await newUser.save()

//       const token = newUser.generateToken()
//       res.send({ info: 'Credenciales correctas', success: true, token, user: newUser })
//     }
//   } catch (err) {
//     return res.status(500).json({ data: err.message, success: false })
//   }
// }
// const UserTemp = require("../model/modelUserTemp")
// const Keys = require("../model/modelClaves.js");
// const reset = async (req, res) => {
//   try {
//     await Keys.deleteMany();
//     await Lesson.deleteMany();
//     await UserTemp.deleteMany();
//     await User.deleteMany();
//     res.json({ info: "Borrado todo" });
//   }
//   catch (err) {
//     return res.status(500).json({ info: err, success: false })
//   }
// }

module.exports = {
  getAll,
}
