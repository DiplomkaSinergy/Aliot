export type InputType = 'text' | 'email';
export type NameType = 'firstName' | 'email' | 'numberPhone' | 'companyName' | 'websiteAddress' | 'messaAge';

export type IData = {
    name: string;
    label: string;
    placeholder: string;
    type?: InputType;
}

export const dataLabels: IData[] = [
    {
        name: 'firstName',
        placeholder: 'Полное имя',
        label: "First Name",
        type: 'text'
    },
    {
        name: 'email',
        placeholder: 'Адрес электронной почты',
        label: "email",
        type: 'email'
    },
    {
        name: 'numberPhone',
        placeholder: 'Номер телефона',
        label: "numberPhone",
        type: 'text'
    },
    {
        name: 'companyName',
        placeholder: 'Название компании',
        label: "numberPhone",
        type: 'text'
    },
    {
        name: 'websiteAddress',
        placeholder: 'Адрес веб-сайта',
        label: "websiteAddress",
        type: 'text'
    },
    {
        name: 'messaAge',
        placeholder: 'Введите ваше сообщение',
        label: "messaage",
        type: 'text'
    },
]


// <label>
// <input type='text' className='FeedbackForm__input' placeholder='Полное имя'
//     {...register('firstName', {})}/>
// <div className="Form-error">
//     {errors?.firstName && (
//         <p>{errors?.firstName?.message || 'Ошибка!'}</p>
//     )}
// </div>
// </label>
// <label>
// <input type='text' className='FeedbackForm__input' placeholder='Адрес электронной почты'
//     {...register('email', {
//         required: true,
        
//     })}/>
// <div className="Form-error">
//     {errors?.email && (<p>{errors?.email?.message || 'Ошибка!'}</p>)}
// </div>
// </label>
// <label>
// <input type='text' className='FeedbackForm__input' placeholder='Номер телефона'
//     {...register('numberPhone', {})}/>
// <div className="Form-error">
//     {errors?.numberPhone && (<p>{errors?.numberPhone?.message || 'Ошибка!'}</p>)}
// </div>
// </label>
// <label>
// <input type='text' className='FeedbackForm__input' placeholder='Название компании'
//     {...register('companyName')}/>
// <div className="Form-error">
//     {errors?.companyName && (
//         <p>{errors?.companyName?.message || 'Ошибка!'}</p>
//     )}
// </div>
// </label>
// <label>
// <input type='text' className='FeedbackForm__input' placeholder='Адрес веб-сайта'
//     {...register('websiteAddress')}/>
// <div className="Form-error">
//     {errors?.websiteAddress && (
//         <p>{errors?.websiteAddress?.message || 'Ошибка!'}</p>
//     )}
// </div>
// </label>
// <textarea id="" className='FeedbackForm__input' placeholder='Введите ваше сообщение'
// {...register('message')}
// ></textarea>