export interface IPotencia {
  //perdida por friccion por cada accesorio
  Hf: number[];
  Velocidad: number[];
  //perdida por friccion +1
  Hfs: number[];
  //perdida menores por cada accesorio
  Hm: number[];
  //area
  A: number[];
  //caudal
  Q: number[];
}
