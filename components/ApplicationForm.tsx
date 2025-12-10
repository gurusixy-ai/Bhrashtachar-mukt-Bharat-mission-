import React from 'react';
import { User } from '../types';

interface ApplicationFormProps {
  user: User;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ user }) => {
  // Helper to format full address for display
  const fullAddress = `${user.details.village}, Post: ${user.details.post}, Block/Tehsil: ${user.details.block}`;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl mx-auto p-[25mm] relative text-slate-900 font-serif leading-relaxed print:shadow-none print:w-full print:mx-0">
      
      {/* Header */}
      <div className="text-center font-bold mb-6 text-sm border-b-2 border-black pb-4">
        <p className="text-lg">कार्यालय : राजकीय मेडिकल कॉलेज रोड, नौशेरा, बदायूं</p>
        <p>मोबाइल : 9410020563</p>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <p>सेवा में,</p>
        <p className="font-bold">अध्यक्ष / सचिव महोदय</p>
        <p className="font-bold">भ्रष्टाचार मुक्त भारत मिशन,</p>
      </div>

      <div className="mb-6 font-bold underline text-center">
        विषय : मिशन से जुड़ने हेतु आवेदन।
      </div>

      {/* Body */}
      <div className="text-justify mb-6 space-y-4">
        <p>
          महोदय/महोदया,
        </p>
        <p>
          मैं <strong>{user.details.fullName}</strong> पुत्र/पत्नी <strong>{user.details.fatherName}</strong>, 
          निवासी <strong>{user.details.village}</strong>, पोस्ट <strong>{user.details.post}</strong>,
          तहसील <strong>{user.details.block}</strong>, जिला <strong>{user.details.district}</strong>, राज्य <strong>{user.details.state}</strong> का नागरिक हूं/हूँ।
        </p>
        <p>
          मुझे <strong>भ्रष्टाचार मुक्त भारत मिशन</strong> के उद्देश्यों, सिद्धांतों और कार्यप्रणाली की जानकारी है तथा मैं मिशन के उद्देश्यों के प्रति पूर्ण समर्पित होकर जनहित में इसके कार्यों में ईमानदारी, निष्ठा और जवाबदेही के साथ योगदान देने का वचन देता/देती हूँ। मुझे मिशन द्वारा सौंपे गए किसी भी दायित्व का पालन मैं अपनी क्षमता और योग्यता के अनुसार निष्ठा से करूँगा/करूँगी।
        </p>
      </div>

      {/* User Details Grid */}
      <div className="flex justify-between items-end mb-8">
        <div className="w-2/3 space-y-2 text-sm">
          <p><strong>सादर,</strong></p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            <div className="col-span-2"><strong>नाम :</strong> {user.details.fullName}</div>
            <div className="col-span-2"><strong>पिता/पति :</strong> {user.details.fatherName}</div>
            <div><strong>जन्म तिथि :</strong> {user.details.dob}</div>
            <div><strong>मोबाइल :</strong> {user.details.mobile}</div>
            <div className="col-span-2"><strong>ग्राम :</strong> {user.details.village}, पोस्ट: {user.details.post}</div>
            <div><strong>ब्लॉक/तहसील:</strong> {user.details.block}</div>
            <div><strong>जिला:</strong> {user.details.district}</div>
            <div className="col-span-2"><strong>राज्य :</strong> {user.details.state}</div>
            <div className="col-span-2"><strong>आई डी नं :</strong> {user.edNumber}</div>
            <div className="col-span-2"><strong>ई-मेल :</strong> {user.email}</div>
          </div>
        </div>
        <div className="text-center w-1/3">
           <div className="h-28 w-24 border border-gray-400 mx-auto mb-2 flex items-center justify-center bg-gray-50 overflow-hidden">
             {user.details.photoUrl ? (
                 <img src={user.details.photoUrl} alt="Photo" className="w-full h-full object-cover" />
             ) : (
                 <span className="text-xs text-gray-400">फोटो</span>
             )}
           </div>
           <p className="mt-4 border-t border-black w-3/4 mx-auto pt-1 font-bold">{user.details.fullName}</p>
           <p>(हस्ताक्षर आवेदक)</p>
        </div>
      </div>

      {/* Oath */}
      <div className="mb-6 border-t-2 border-black pt-4">
        <h3 className="font-bold text-center mb-2 text-lg">शपथ-पत्र</h3>
        <p className="text-justify">
          मैं, उपर्युक्त, प्रतिज्ञा करता/करती हूँ कि मैं भारत के संविधान और समाज की भलाई के अनुरूप भ्रष्टाचार के विरुद्ध काम करूँगा/करूँगी। समाज के दुख-दर्द को समझना और संभव सहायता करना मेरी नैतिक जिम्मेदारी है, और इसके लिए मैं सदैव प्रयत्नशील रहूँगा/रहूँगी।
        </p>
        <div className="mt-8 text-right">
           <p><strong>शपथकर्ता :</strong> {user.details.fullName}</p>
        </div>
      </div>

      {/* Declaration */}
      <div className="mb-6 border-t border-dashed border-gray-400 pt-4">
        <h3 className="font-bold text-center mb-2 text-lg">घोषणा-पत्र</h3>
        <p className="text-justify">
          मैं यह घोषणा करता/करती हूँ कि मिशन के निर्देशों, नियमों एवं शर्तों का पालन करूँगा/करूँगी। यदि मैं नियमों का उल्लंघन करता/करती पाया गया तो मिशन मुझे सदस्यता समाप्त करने वा अन्य अनुशासनिक कार्रवाई करने का अधिकार रखता है, जिसकी सारी जिम्मेदारी मेरे ऊपर होगी।
        </p>
        <div className="mt-8 text-right">
           <p><strong>घोषणाकर्ता :</strong> {user.details.fullName}</p>
        </div>
      </div>

      {/* Attachments */}
      <div className="mb-6 text-sm">
        <p className="font-bold mb-2">संलग्नक (स्वप्रमाणित छायाप्रति) :</p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>पहचान पत्र (आधार कार्ड)</li>
            <li>फोटो</li>
        </ol>
      </div>

      <div className="absolute bottom-10 left-0 w-full text-center text-xs text-gray-400 print:bottom-4">
          <p>Generated by ED-Gen Identity System</p>
      </div>
    </div>
  );
};