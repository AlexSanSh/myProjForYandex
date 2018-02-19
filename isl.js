const matrix = [
  [0,1,1,1],
  [0,1,0,1],
  [0,1,0,1],
  [1,1,0,1]
];
 
 function findLand(x,y) {
   matrix[x][y] = 0;
   if (y > 0 && matrix[x][y-1] == 1) findLand(x,y-1);
   if (y < 3 && matrix[x][y+1] == 1) findLand(x,y+1);
   if (x > 0 && matrix[x-1][y] == 1) findLand(x-1,y);
   if (x < 3 && matrix[x+1][y] == 1) findLand(x+1,y);
 };
 
 function solution() {
   let counter = 0;
   for (let i = 0; i < matrix.length; i++) {
     for (let j = 0; j < matrix[i].length; j++) {
       if (matrix[i][j]) {
         counter += 1;
         findLand(i,j);
       }
     }
   }
   return counter;
 }
 
 console.log(solution());
