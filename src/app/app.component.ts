import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'my-app';
  PuzzlePiecesArray:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  timerSecond:number=0
  timerMilliSecond:number=0
  transparentPosition:number=15;
  inspectionTime:boolean=true;
  inspectionTimer:number=3;
  /*when this variable is true it means that the user hasnt waited for the inspection time to finish and clicked a button before the timer*/ 
  hardResetted:boolean=false
  ngOnInit(): void {
    this.shufflePieces()
    
  }
  shufflePieces(){
    this.hardResetted=false
    this.timerSecond=0
    this.timerMilliSecond=0
        /////  start to shuffle the order
        for(let i=0;i<1000;i++){
          //random position beetwen 0 and 15
          let randomPosition=Math.floor(Math.random() * 16);
          this.move(randomPosition)
        }
        this.StartInspectionTimer()

  }
  move(PiecePositon:number){
    ////case n 1 if it has to move right
    if(this.isInSameRow(PiecePositon,this.transparentPosition) && this.transparentPosition>PiecePositon){
      this.moveRight(PiecePositon)

    }
    ////case n 2 if it has to move left
    if(this.isInSameRow(PiecePositon,this.transparentPosition) && this.transparentPosition<PiecePositon){
      this.moveLeft(PiecePositon)

    }
    ////case n 3 if it has to move up
    if(this.isInSameColumn(PiecePositon,this.transparentPosition) && this.transparentPosition<PiecePositon){
      this.moveUp(PiecePositon)

    }
    ////case n 3 if it has to move down
    if(this.isInSameColumn(PiecePositon,this.transparentPosition) && this.transparentPosition>PiecePositon){
      this.moveDown(PiecePositon)

    }

  }
  //// call this if you want to see if two pieces are in the same row (0 based positon)
  isInSameRow(Piece1:number,Piece2:number){
    Piece1++;Piece2++
    let toReturn:boolean=Math.ceil(Piece1/4)==Math.ceil(Piece2/4)
    return toReturn

  }
    //// call this if you want to see if two pieces are in the same column (0 based positon)
  isInSameColumn(Piece1:number,Piece2:number){
    let toReturn:boolean=Piece1%4==Piece2%4
    return toReturn
  }
  //call this function when you need to move the pieces of the puzzle to the right and pass the starting position (0 based)
  moveRight(startingPosition:number){
    let oldPiecesPosition:number[]=this.PuzzlePiecesArray
    for(let i=oldPiecesPosition.length-1;i>-1;i--){
      if(i>startingPosition && this.isInSameRow(i,startingPosition) && i<=this.transparentPosition){
        this.PuzzlePiecesArray[i]=oldPiecesPosition[i-1]
     }
    }
    this.PuzzlePiecesArray[startingPosition]=16
    this.transparentPosition=startingPosition

    
  }
  //call this function when you need to move the pieces of the puzzle to the left and pass the starting position (0 based)
  moveLeft(startingPosition:number){
    let oldPiecesPosition:number[]=this.PuzzlePiecesArray
    for(let i=0;i< oldPiecesPosition.length;i++){
      if(i<startingPosition && this.isInSameRow(i,startingPosition) && i>=this.transparentPosition){
        this.PuzzlePiecesArray[i]=oldPiecesPosition[i+1]
     }
    }
    this.PuzzlePiecesArray[startingPosition]=16
    this.transparentPosition=startingPosition
  }
  //call this function when you need to move the pieces of the puzzle up and pass the starting position (0 based)
  moveUp(startingPosition:number){
    let oldPiecesPosition:number[]=this.PuzzlePiecesArray
    for(let i=0;i<oldPiecesPosition.length;i++){
      if(i<startingPosition && this.isInSameColumn(i,startingPosition) && i>=this.transparentPosition){
        this.PuzzlePiecesArray[i]=oldPiecesPosition[i+4]
     }
    }
    this.PuzzlePiecesArray[startingPosition]=16
    this.transparentPosition=startingPosition
  }
  //call this function when you need to move the pieces of the puzzle down and pass the starting position (0 based)
  moveDown(startingPosition:number){
    let oldPiecesPosition:number[]=this.PuzzlePiecesArray
    for(let i=oldPiecesPosition.length-1;i>-1;i--){
      if(i>startingPosition && this.isInSameColumn(i,startingPosition) && i<=this.transparentPosition){
        this.PuzzlePiecesArray[i]=oldPiecesPosition[i-4]
     }
    }
    this.PuzzlePiecesArray[startingPosition]=16
    this.transparentPosition=startingPosition

    
  }
  //call this functiono to end the inspection time
  endTimer(){
    if(this.inspectionTime){
      this.hardResetted=true
      this.timerMilliSecond=0
      this.timerSecond=0
      this.inspectionTime=false
      this.inspectionTimer=0

      
    }
  }
  ///call this function to start inspection timer
  StartInspectionTimer(){
    this.inspectionTime=true;
    this.inspectionTimer=3;
      setTimeout(() => {
        this.inspectionTimer--
        this.inspectionTime=this.inspectionTimer>0
        setTimeout(() => {
          this.inspectionTimer--
          this.inspectionTime=this.inspectionTimer>0
          setTimeout(() => {
            this.inspectionTimer--
            this.inspectionTime=this.inspectionTimer>0
            console.log("hardreset:",this.hardResetted)
            if(!this.hardResetted){
            this.timerMilliSecond<1 && this.timerSecond<1?/*if timer is already started just need to rest it*/ this.startTimerClock():this.resetTimer()
            }
          }, 1000);
        }, 1000);
      }, 1000);
  }
  /*resests the timer so that i dont need to call the function again and leave it open as a loop*/
  resetTimer(){
    this.timerMilliSecond=0
    this.timerSecond=0
  }
  startTimerClock(){
    this.increaseTimeSeconds()
    this.increaseTimeMilliSecond()
  }
  increaseTimeSeconds(){
    this.timerSecond++
    setTimeout(() => {
      this.increaseTimeSeconds()
    }, 1000);
    
  }
  increaseTimeMilliSecond(){
    if(this.timerMilliSecond!=990){
      this.timerMilliSecond=this.timerMilliSecond+10
    }else{
      this.timerMilliSecond=0
    }
    setTimeout(() => {
      this.increaseTimeMilliSecond()
    }, 1);

  }
}
