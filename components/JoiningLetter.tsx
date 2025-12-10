import React from 'react';
import { User, OrganizationAssets } from '../types';
import { OfficialStamp } from './Stamp';

interface JoiningLetterProps {
  user: User;
  assets?: OrganizationAssets;
}

export const JoiningLetter: React.FC<JoiningLetterProps> = ({ user, assets }) => {
  const content = user.documents.joiningLetterContent || "Letter not yet generated.";
  // Filter out any accidentally generated Subject lines or Headers if they exist in old data
  const paragraphs = content.split('\n')
    .filter(p => p.trim() !== '')
    .filter(p => !p.toLowerCase().startsWith('subject:'))
    .filter(p => !p.toLowerCase().includes('bhrashtachar mukt bharat mission'));

  // Fallback if filtering removed everything (shouldn't happen with new prompt)
  const displayParagraphs = paragraphs.length > 0 ? paragraphs : content.split('\n').filter(p => p.trim() !== '');

  // Construct full address
  const fullAddress = `${user.details.village}, ${user.details.post}, ${user.details.district}`;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl mx-auto p-[20mm] pt-[15mm] relative text-slate-900 font-serif print:shadow-none print:w-full print:mx-0 print:p-[20mm]">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start border-b-2 border-slate-300 pb-4 mb-8">
        <div className="flex flex-col">
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase leading-none font-sans mb-1">
             Bhrashtachar Mukt Bharat<br/>
             <span className="text-slate-800">Mission</span>
           </h1>
           <p className="text-xs text-slate-600 font-semibold mt-1">Rajkiya Medical College Road, Naushera, Budaun</p>
           <p className="text-xs text-slate-500">bmbm.gov@gmail.com | +91 9410020563</p>
        </div>
        <div className="text-right">
             <div className="text-3xl font-bold text-slate-200 uppercase leading-none font-sans text-right tracking-tighter">
               Appointment<br/>Letter
             </div>
        </div>
      </div>

      {/* META DATA */}
      <div className="flex justify-between mb-8 text-sm font-sans">
        <div>
          <span className="font-bold text-slate-800">Ref:</span> BMBM/HR/{new Date().getFullYear()}/{user.edNumber.split('-').pop()}
        </div>
        <div>
          <span className="font-bold text-slate-800">Date:</span> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* RECIPIENT */}
      <div className="mb-8 pl-1">
        <p className="font-bold text-lg text-slate-900">{user.details.fullName}</p>
        <p className="text-slate-700">{fullAddress}</p>
        <p className="text-slate-700">Mobile: {user.details.mobile}</p>
      </div>

      {/* SUBJECT LINE */}
      <div className="mb-6 font-bold text-slate-900 text-[11pt]">
        <span className="underline decoration-slate-400 underline-offset-4">Subject: Confirmation of Membership/Appointment as {user.details.designation}</span>
      </div>

      {/* BODY CONTENT */}
      <div className="space-y-5 text-justify leading-relaxed text-slate-800 text-[11pt] font-serif">
        {displayParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
        ))}
      </div>

      {/* SIGNATURE SECTION */}
      <div className="mt-24 flex justify-between items-end relative">
        {/* Left: Acceptance */}
        <div className="mb-2">
          <p className="font-bold mb-8 text-sm">Accepted By:</p>
          <div className="border-t border-slate-400 w-48 pt-2">
            <p className="font-bold text-slate-900 text-sm">{user.details.fullName}</p>
            <p className="text-xs text-slate-500">(Signature)</p>
          </div>
        </div>

        {/* Right: Authority */}
        <div className="text-right relative">
          <p className="font-bold text-sm mb-4">For Bhrashtachar Mukt Bharat Mission</p>
           
          <div className="relative h-24 w-64 ml-auto flex items-end justify-end mb-2">
             {/* Stamp */}
             <div className="absolute right-12 bottom-4 opacity-90 mix-blend-multiply -rotate-6 pointer-events-none">
                {assets?.stamp ? (
                    <img src={assets.stamp} alt="Stamp" className="w-24 h-24 object-contain" />
                ) : (
                    <OfficialStamp className="w-24 h-24 text-blue-800" />
                )}
             </div>
             
             {/* Signature */}
             <div className="relative z-10 mb-2 mr-6">
                {assets?.signature ? (
                    <img src={assets.signature} alt="Signature" className="h-12 object-contain" />
                ) : (
                    <span className="font-signature text-4xl text-black">Ad. Mohar Singh</span>
                )}
             </div>
          </div>

          <div className="border-t border-slate-400 w-64 pt-2 text-sm ml-auto">
            <p className="font-bold text-slate-900">Ad. Mohar Singh</p>
            <p className="text-slate-600 text-xs font-semibold">National President</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-12 left-0 w-full text-center">
         <div className="w-3/4 mx-auto border-t border-slate-200 mb-2"></div>
         <p className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">
           Bhrashtachar Mukt Bharat Mission | Rajkiya Medical College Road, Naushera, Budaun
         </p>
         <p className="text-[9px] text-slate-300 font-sans mt-0.5">This is a computer-generated document.</p>
      </div>
    </div>
  );
};