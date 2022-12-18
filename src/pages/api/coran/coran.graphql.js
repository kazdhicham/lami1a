export const coranDefs = `
type Ayah {
  number: Int
  text: String
  numberInSurah: Int
  juz: Int
}

type Soura {
  _id: Int
  ayahs: [Ayah]
  englishName:String
  name: String
}

type Query {
    souras:[Soura] 
    soura(id: Int):Soura
    ayahs(id: Int):[Ayah]
  
  }
  
`;
