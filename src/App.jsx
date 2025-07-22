import { useState } from 'react';
import wheelSvg from '../public/Artboard1.SVG'

const prizes = [
  { label: '100 ميلي هدية', from: 25, to: 80 },
  { label: 'ترافل سايز هدية', from: 205, to: 260 },
  { label: 'هاند كريم هدية', from: 310, to: 360 },
  { label: 'بودي سبلاش', from: 130, to: 180 },
  { label: 'فوتشر بـ 500 جنيه', from: 260, to: 310 },
  { label: 'فوتشر كينج خصم 1000 جنيه', from: 180, to: 205 },
  { label: 'كارت خصم شهري 60%', from: 0, to: 25 },
  { label: '💥 حظ أوفر المرة القادمة', from: 80, to: 130 },
];

function App() {
  const [rotating, setRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const getPrizeByAngle = (angle) => {
    const normalized = angle % 360;
    return prizes.find(p => normalized >= p.from && normalized < p.to)?.label || 'غير معروف';
  };

  const sendDataToSheet = async (prizeText) => {
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbyeEgBedCVoIU8Fm-LNyuw439dG7GQ73LM9BxTwWqyplOCnsdpCNKbrHXTFppRNjbux/exec';

    const payload = {
      Phone: phone,
      Prize: prizeText,
      Email: email,
      Date: new Date().toLocaleDateString('ar-EG'),
      Time: new Date().toLocaleTimeString('ar-EG'),
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('فشل إرسال البيانات:', error);
    }
  };

 const handleSpinClick = () => {
  if (!phone.trim()) {
    alert('من فضلك أدخل رقم الهاتف');
    return;
  }

  if (!email.trim()) {
    alert('من فضلك أدخل البريد الإلكتروني');
    return;
  }

  const randomAngle = Math.floor(Math.random() * 360) + 720;
  setRotation(prev => prev + randomAngle);
  setRotating(true);

  setTimeout(() => {
    const angle = (rotation + randomAngle) % 360;
    const prizeText = getPrizeByAngle(angle);
    alert(`مبروك! ربحت: ${prizeText}`);
    sendDataToSheet(prizeText);
    setRotating(false);
  }, 5000);
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6" style={{ color: '#6b2c27' }}>🎡 Oliver Wheel</h1>

      <input
        type="tel"
        placeholder="أدخل رقم الهاتف"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-3 px-4 py-2 border border-gray-300 rounded-md w-64"
      />

      <input
        type="email"
        placeholder="أدخل بريدك الإلكتروني "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-md w-64"
      />

      {/* SVG Wheel */}
      <div className="relative w-[500px] h-[500px] mb-6">
        <img
          src={wheelSvg}
          alt="Wheel"
          className="w-full h-full transition-transform duration-[5s] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] text-xl">🔻</div>
      </div>

      <button
  onClick={handleSpinClick}
  disabled={rotating}
  className={`px-6 py-3 rounded-xl text-lg transition duration-300 ${
    rotating
      ? 'bg-gray-400 text-white'
      : ''
  }`}
  style={{
    backgroundColor: rotating ? '#ccc' : '#d6ae7b',
    color: '#271013',
  }}
  onMouseOver={(e) => {
    if (!rotating) e.currentTarget.style.backgroundColor = '#eacda3';
  }}
  onMouseOut={(e) => {
    if (!rotating) e.currentTarget.style.backgroundColor = '#d6ae7b';
  }}
>

        Spin🎯
      </button>
    </div>
  );
}

export default App;



// import { useState } from 'react';
// import { Wheel } from 'react-custom-roulette';

// const data = [
//   { option: '100 \n ميلي  \nهدية' },
//   { option: 'ترافل سايز هدية' },
//   { option: 'هاند كريم هدية' },
//   { option: 'بودي سبلاش' },
//   { option: 'فوتشر بـ 500 جنيه (min 2500 جنيه)' },
//   { option: 'فوتشر كينج خصم 1000 جنيه (min 4000 جنيه)' },
//   { option: 'كارت خصم شهري 60%' },
//   { option: '💥 حظ أوفر المرة القادمة' },
// ];

// function App() {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');

//   const handleSpinClick = () => {
//     if (!phone.trim()) {
//       alert('من فضلك أدخل رقم الهاتف قبل لف العجلة');
//       return;
//     }

//     const newPrize = Math.floor(Math.random() * data.length);
//     setPrizeNumber(newPrize);
//     setMustSpin(true);
//   };

//   const sendDataToSheet = async (prizeText) => {
//     const webhookUrl = 'https://script.google.com/macros/s/AKfycbyeEgBedCVoIU8Fm-LNyuw439dG7GQ73LM9BxTwWqyplOCnsdpCNKbrHXTFppRNjbux/exec'; // استبدل بـ رابطك

//     const payload = {
//       Phone: phone,
//       Prize: prizeText,
//       Email: email,
//       Date: new Date().toLocaleDateString('ar-EG'),
//       Time: new Date().toLocaleTimeString('ar-EG'),
//     };


//     console.log(payload);
    
//     try {
//       const res = await fetch(webhookUrl, {
//   method: 'POST',
//   mode: 'no-cors', // <== دي الإضافة
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(payload),
// });
    

//       const result = await res.json();
//       console.log("تم الإرسال:", result);
//     } catch (error) {
//       console.error('فشل إرسال البيانات:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold text-pink-600 mb-6">🎉 عجلة الحظ 🎡</h1>

//       <input
//         type="tel"
//         placeholder="أدخل رقم الهاتف"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-center w-64"
//       />

//           {/* الإيميل */}
//       <input
//         type="email"
//         placeholder="أدخل بريدك الإلكتروني (اختياري)"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-center w-64"
//       />
  

// <div className="wheel-container" style={{ 
//   width: '500px', 
//   height: '500px',
//   transform: 'scale(1)' // تكبير بنسبة 1.5
// }}>
//   <Wheel
//   mustStartSpinning={mustSpin}
//   prizeNumber={prizeNumber}
//   data={data}
//   backgroundColors={['#8B4513', '#D2B48C']}
//   textColors={['#ffffff']}
//   fontSize={12} // تصغير الخط
//   textDistance={50} // تقريب النص من المركز
//   outerBorderWidth={8}
//   outerBorderColor="#8B4513"
//   radiusLineColor="#654321"
//   radiusLineWidth={2}
//   onStopSpinning={() => {
//     setMustSpin(false);
//     const prizeText = data[prizeNumber].option;
//     alert(`مبروك! ربحت: ${prizeText}`);
//     sendDataToSheet(prizeText);
//   }}
// />
// </div>

    
//       {/* <Wheel
//         mustStartSpinning={mustSpin}
//         prizeNumber={prizeNumber}
//         data={data}
//         backgroundColors={['#f43f5e', '#facc15']}
//         textColors={['#ffffff']}
//         fontSize={16}
      
//         outerBorderWidth={6}
//         outerBorderColor="#e11d48"
//         radiusLineColor="#f43f5e"
//         radiusLineWidth={1}
//         onStopSpinning={() => {
//           setMustSpin(false);
//           const prizeText = data[prizeNumber].option;
//           alert(`مبروك! ربحت: ${prizeText}`);
//           sendDataToSheet(prizeText);
//         }}
//       /> */}

//       <button
//         onClick={handleSpinClick}
//         className="mt-8 px-6 py-3 bg-pink-600 text-white rounded-xl text-lg hover:bg-pink-700 transition duration-300"
//       >
//         لف العجلة 🎯
//       </button>
//     </div>
//   );
// }

// export default App;
