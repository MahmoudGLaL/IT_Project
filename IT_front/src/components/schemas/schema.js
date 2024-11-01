import * as Yup from "yup"


const regex = /\d/;




// const phoneRegExp = /^0\d{10}$/ ;



// If the input value contains a digit, prevent its input
export let dateTime = ''
export const formatDate = (date,time) => {
    if (date && time) {
        dateTime = `${date}T${time}:${(Math.random() * 60).toFixed(3)}Z`;
        // console.log(dateTime);
        // console.log(typeof(dateTime));
    }
    else return -1
}


const today = new Date();
today.setHours(0, 0, 0, 0);

export const clinicSchema = Yup.object({
   
    // doctorName : Yup.string().test('no-numbers', " * غير مسموح ب ادخال ارقام * ", function(value) {

    //     return !regex.test(value)})
    //     .min(2,"* من فضلك ادخل اسم المريض رباعي * " ).max(30).required("* من فضلك ادخل اسم الدكتور * " ),

    
    name : Yup.string().required("* من فضلك ادخل اسم الجهاز * " ),
    // type : Yup.string().required("* من فضلك ادخل نوع الجهاز * " ),
    // purchase : Yup.string().required("* من فضلك ادخل اذن شراء الجهاز * " ),
    // price : Yup.string().required("* من فضلك ادخل سعر الجهاز * " ),
    // documentNumber : Yup.string().required("* من فضلك ادخل رقم وثيقة الجهاز * " ),
    serialNumber : Yup.string().required("* من فضلك ادخل رقم السيريال للجهاز * " )


    // proccessor : Yup.string().required("* من فضلك ادخل اسم المعالج * " ),
    // core : Yup.string().required("* من فضلك ادخل نوع المعالج* " ),
    // ram : Yup.string().required("* من فضلك ادخل حجم الرامات* " ),
    // hard : Yup.string().required("* من فضلك ادخل حجم الهارد* " ),
    // graphicsCard : Yup.string().required("* من فضلك ادخل حجم كارت الشاشه* " ),
    // deviceLocation : Yup.string().required("*من فضلك ادخل موقع الجهاز* " ),

    // exchangeDate : Yup.date().max(today, '* تاريخ الشراء لا يجب ان يكون تاريخ جديد *').required(" * من فضلك ادخل تاريخ و وقت الشراء* " ).required(" * من فضلك ادخل تاريخ شراء الجهاز * " ) ,

    // .min(today, '* تاريخ العمل لا يجب ان يكون تاريخ  قديم *').required(" * من فضلك ادخل تاريخ و وقت العمل* " ),
    // startFrom : Yup.string().required('* من فضلك ادخل ميعاد البدأ * '),
    // startTo : Yup.string().required('* من فضلك ادخل ميعاد الأنتهاء * '),
}
)

export const updateDevice = Yup.object({
   
    ram : Yup.string().required("* من فضلك ادخل حجم الرامات* " ),
    hard : Yup.string().required("* من فضلك ادخل حجم الهارد* " ),


}
)







export const Locations = Yup.object({
    id : Yup.number().integer()                                                                                                                                                                                                                                                                                                               ,

    // doctorName : Yup.string().test('no-numbers', " * غير مسموح ب ادخال ارقام * ", function(value) {

    //     return !regex.test(value)})
    //     .min(2,"* من فضلك ادخل اسم المريض رباعي * " ).max(30).required("* من فضلك ادخل اسم الدكتور * " ),

    name : Yup.string().required("* من فضلك ادخل اسم الموقع * " ),
    department : Yup.string().required("* من فضلك ادخل اسم القسم* " ),
    building : Yup.string().required("* من فضلك ادخل اسم المبنى* " ),


    // clinicNumber :  Yup.string().test(
    //   'not-equal-to-zero',
    //   ' * رقم المريض لا يمكن ان يكون  صفر * ',
    //   value => value !== '0'
    // ).required(" * من فضلك ادخل رقم المريض * " ),

    // .min(today, '* تاريخ العمل لا يجب ان يكون تاريخ  قديم *').required(" * من فضلك ادخل تاريخ و وقت العمل* " ),
    // startFrom : Yup.string().required('* من فضلك ادخل ميعاد البدأ * '),
    // startTo : Yup.string().required('* من فضلك ادخل ميعاد الأنتهاء * '),
}
) ;

export const workShops = Yup.object({
    id : Yup.number().integer()                                                                                                                                                                                                                                                                                                               ,


    name : Yup.string().required("* من فضلك ادخل اسم الورشه * " ),
  


}
) ;
export const spareParts = Yup.object({
    id : Yup.number().integer()                                                                                                                                                                                                                                                                                                               ,
    
    name : Yup.string().required("* من فضلك ادخل اسم قطعة الغيار * " ),
    allNumber : Yup.string().required("* من فضلك ادخل عدد القطع * " ),
  


}
)
export const Transactionschema = Yup.object().shape({
    deliveryDate: Yup.date()
        .required("* من فضلك ادخل تاريخ التوصيل*"),
    nameOfRecipient: Yup.string()
        .required("* من فضلك ادخل اسم المستلم*"),
    workshopID: Yup.string()
        .required("* من فضلك ادخل اسم الورشه*")
});

