import { useEffect, useState } from 'react';

interface OnlineOrder{
    firstName:string;
    lastName:string;
    phoneNumber:number;
    orderList:string;        
}

interface MenuItem {
  itemid: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  foodtags: string;
  category: string;
  imageurl: string;
}
    

function OnlineOrder (){
    const [showTime,setShowTime] = useState<string>(() => {
        const date = new Date();
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const formattedDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            setShowTime(formattedDate)
        },1000);
        return () => clearInterval(interval);
    },[]);

    function MenuDisplayed(): string{
        const time = new Date().getHours();
        if (time >= 6 && time < 10){
            return 'breakfast';
        } else if (time >= 10 && time < 17){
            return 'lunch';
        } else if (time >= 17 && time < 20){
            return 'dinner';
        } else {
            return 'Closed';
        }
    }

    return (
        <><h1>Current Time: {showTime}</h1><h1>Current Menu: {MenuDisplayed()}</h1></>
    )
}

export default OnlineOrder;