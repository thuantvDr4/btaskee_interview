
const COLORS =[
    '#ff1744',
    '#ff4081',
    '#1de9b6',
    '#ffeb3b',
    '#ffa726',
    '#4caf50',
    '#7c4dff',
    '#2196f3',
    '#e040fb'
];

const randomColor =(range=COLORS)=>{
    const _index = Math.floor(Math.random()* range.length)
    return range[_index]
}

//---------->
export {
    randomColor,
}