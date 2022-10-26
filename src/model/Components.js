const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    Type: { type: String, },
    code: { type: String, },
    Brand: { type: String, },
    Model: { type: String, },
    Price: { type: String, },
    Benchmark: { type: String, },//Rendimiento
    Samples: { type: String, }, //Muestras disponibles
    Img: { type: String, },
  },
  {
    timestamps: false,
    versionKey: false
  }
)

module.exports = model('Components', userSchema)
