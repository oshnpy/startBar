export const showType=(type,listType)=>{
    if(listType==="overtime"){
        switch (type) {
        case 1:  
         return '双休日加班';
        case 2:  
        return '节假日加班'; 
        case 3:  
        return '工作日加班'; 
        default: 
        return  '加班';  
        }
    }else{
         switch (type) {
         case 1: return  '年假';  
         case 2:  return '调休';  
         default: return  '休假';  
        }

    }
} 
export const reducetime=(start,end)=>{
    //获取时间差
    let start_num=new Date(new Date(start).toGMTString())*1;
    let end_num=new Date(new Date(end).toGMTString())*1;
    let num=end_num-start_num;
    let day=parseFloat(num/1000/60/60/24).toFixed(1);
   return day;
    
 }