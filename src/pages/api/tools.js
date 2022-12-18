import { FLAG_FILES } from './flagArray';
function genPassCollaborator() {
  //Math.random().toString(36).substr(2, 8)
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 5;
  let password = '';
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}
export function genRandomFlag() {
  var randomNumber = Math.floor(Math.random() * FLAG_FILES.length);
  return FLAG_FILES[randomNumber];
}
export const createTenLiis = async () => {
  const liisSet = new Set();
  while (liisSet.size < 10) {
    liisSet.add(genPassCollaborator());
  }
  try {
    const monArrayliis = [];
    liisSet.forEach(async (value) => {
      await monArrayliis.push({ pass: value, flag: genRandomFlag() });
    });
    return monArrayliis;
  } catch (error) {
    throw new Error(error);
  }
};
export const createHundredLiis = async () => {
  const liisSet = new Set();
  while (liisSet.size < 100) {
    liisSet.add(genPassCollaborator());
  }
  try {
    const monArrayliis = [];
    liisSet.forEach(async (value) => {
      await monArrayliis.push({ pass: value, flag: genRandomFlag() });
    });
    return monArrayliis;
  } catch (error) {
    throw new Error(error);
  }
};
/* const createFlagSet = async () =>{
  const flagSet =  new Set()
  fs.readdir('public/assets/img/flags',(err, files) => {
  if (err){
    console.log(err);}
  else {
  
    files.forEach((file, index) => {
       if (path.extname(file) == ".png")
       flagSet.add(file)
       
    }) 
    return  Array.from(flagSet.values()) 
  }
})
  }
 */
/* try {
       fs.writeFile('tools/flags.js',JSON.stringify(flagSet.values()), (err, data) => {
        if (err) throw new Error(err) 
        console.log(data
          )
      })   
      const file = fs.createWriteStream('tools/flags');
file.on('error', function(err) { throw new Error(err)});
file.write(`[` + '\n')
flagSet.forEach(function(v) { 
  file.write(`'${v}',` + '\n'); 
  console.log({v})
});
file.write(`]` + '\n')
file.end();
     
    } catch (error) {
      console.log({ error})
    } */
