const {ImageKit}=require("@imagekit/nodejs")

const imagekit=new ImageKit({
  privateKey:process.env.PVT_K,
})

const fs=require("fs");

async function uploadFile(file) {
  const result=await imagekit.files.upload({
    file:fs.readFileSync(file.path).toString("base64"),
    fileName:file.originalname,
    folder: "products",
  })
  console.log("url",result);
  return result.url;
}

module.exports={uploadFile }

