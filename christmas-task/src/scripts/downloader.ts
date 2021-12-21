interface IToy{
  num: string
  name: string
  count: string
  year: string
  shape: string
  color: string
  size: string
  favorite: boolean
}

let toys: Promise<IToy[]>;

export default async function getToys() {
  if (!(await toys)?.length) toys = <Promise<IToy[]>><unknown>(await fetch('./assets/data.json')).json();
  const favToys = <string[]>JSON.parse(localStorage.getItem('favToys') || '[]');
  return (await toys).map((toy) => {
    toy.favorite = favToys.includes(toy.num);
    return toy;
  });
}
