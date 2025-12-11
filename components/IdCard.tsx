import React from 'react';
import { User, OrganizationAssets } from '../types';
import { OfficialStamp } from './Stamp';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';

interface IdCardProps {
  user: User;
  assets?: OrganizationAssets;
}

export const IdCard: React.FC<IdCardProps> = ({ user, assets }) => {
  const theme = assets?.idCardTheme || 'patriotic';

  // Theme configurations
  const getThemeStyles = () => {
      switch (theme) {
          case 'blue':
              return {
                  headerBg: 'bg-gradient-to-r from-blue-700 to-indigo-800',
                  accentColor: 'text-blue-700',
                  bottomBar: 'bg-indigo-800',
                  designationColor: 'text-blue-600',
                  socialColor: 'border-blue-100 bg-blue-50'
              };
          case 'dark':
              return {
                  headerBg: 'bg-gradient-to-r from-slate-800 to-slate-900',
                  accentColor: 'text-slate-800',
                  bottomBar: 'bg-slate-900',
                  designationColor: 'text-slate-600',
                  socialColor: 'border-slate-200 bg-slate-100'
              };
          case 'red':
            return {
                headerBg: 'bg-gradient-to-r from-red-700 to-red-900',
                accentColor: 'text-red-800',
                bottomBar: 'bg-red-900',
                designationColor: 'text-red-600',
                socialColor: 'border-red-100 bg-red-50'
            };
          case 'minimal':
              return {
                  headerBg: 'bg-slate-200', // Very subtle
                  headerText: 'text-slate-800', // Dark text for light bg
                  accentColor: 'text-slate-800',
                  bottomBar: 'bg-slate-400',
                  designationColor: 'text-slate-600',
                  socialColor: 'border-slate-200 bg-slate-50'
              };
          case 'patriotic':
          default:
              return {
                  headerBg: 'bg-gradient-to-r from-orange-600 to-green-700',
                  accentColor: 'text-slate-800',
                  bottomBar: 'bg-green-700',
                  designationColor: 'text-orange-600',
                  socialColor: 'border-slate-100 bg-slate-50'
              };
      }
  };

  const styles = getThemeStyles();
  const isMinimal = theme === 'minimal';

  return (
    <div className="w-[350px] h-[550px] bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 relative print:shadow-none print:border-slate-400 select-none">
      {/* Header Background */}
      <div className={`h-32 ${styles.headerBg} absolute top-0 w-full z-0`}>
        <div className="absolute opacity-10 top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-6 h-full">
        {/* Company Logo Area */}
        <div className="flex flex-col items-center mb-2 px-2">
           {assets?.logo && (
             <img src={assets.logo} alt="Logo" className="h-16 w-16 object-contain bg-white rounded-full p-1 mb-1 shadow-sm" />
           )}
           <div className={`font-bold text-lg text-center leading-tight drop-shadow-md uppercase ${isMinimal ? 'text-slate-800' : 'text-white'}`}>
             BHRASHTACHAR MUKT<br/>BHARAT MISSION
           </div>
        </div>

        {/* Photo */}
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 mt-1 relative z-20">
          <img 
            src={user.details.photoUrl} 
            alt={user.details.fullName} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Role */}
        <div className="mt-4 text-center px-4 w-full">
          <h2 className={`text-xl font-bold uppercase tracking-tight truncate ${styles.accentColor}`}>{user.details.fullName}</h2>
          <p className={`font-semibold text-sm mt-1 uppercase ${styles.designationColor}`}>{user.details.designation}</p>
        </div>

        {/* ID Number Badge */}
        <div className="mt-2 bg-slate-100 px-4 py-1 rounded-full border border-slate-200">
          <span className="text-xs font-bold text-slate-500 tracking-widest">ID: </span>
          <span className="text-sm font-mono font-bold text-slate-800">{user.edNumber}</span>
        </div>

        {/* Social Icons on Card - Digital ID Links */}
        {(user.socialLinks?.facebook || user.socialLinks?.twitter || user.socialLinks?.instagram) && (
           <div className={`flex gap-3 mt-2 px-3 py-1.5 rounded-full border shadow-sm ${styles.socialColor}`}>
              {user.socialLinks.facebook && <Facebook size={14} className="text-[#1877F2]" fill="currentColor"/>}
              {user.socialLinks.twitter && <Twitter size={14} className="text-[#1DA1F2]" fill="currentColor"/>}
              {user.socialLinks.instagram && <Instagram size={14} className="text-[#E4405F]"/>}
           </div>
        )}

        {/* Details Grid */}
        <div className="mt-4 w-full px-8 space-y-1.5">
          <div className="flex justify-between border-b border-slate-100 pb-1 items-center">
            <span className="text-xs text-slate-400 uppercase font-medium">Department</span>
            <span className="text-xs font-medium text-slate-700">{user.details.department}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1 items-center">
            <span className="text-xs text-slate-400 uppercase font-medium">DOB</span>
            <span className="text-xs font-medium text-slate-700">{user.details.dob}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1 items-center">
            <span className="text-xs text-slate-400 uppercase font-medium flex items-center gap-1"><Phone size={10}/> Mobile</span>
            <span className="text-xs font-bold text-slate-900">{user.details.mobile}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1 items-center">
            <span className="text-xs text-slate-400 uppercase font-medium flex items-center gap-1"><Mail size={10}/> Email</span>
            <span className="text-[10px] font-medium text-slate-700">{user.email || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1 items-center">
            <span className="text-xs text-slate-400 uppercase font-medium">Location</span>
            <span className="text-xs font-medium text-slate-700 truncate max-w-[150px]">{user.details.district}, {user.details.state}</span>
          </div>
        </div>

        {/* Footer / Auth */}
        <div className="mt-auto mb-2 w-full px-6 flex justify-between items-end pb-2 relative">
            <div className="flex flex-col items-center gap-1">
                 <div className="bg-white p-1 shadow-sm rounded border border-slate-100">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.details.fullName} | ${user.edNumber} | ${user.details.mobile} | Verified Member of BMBM`} 
                        alt="QR" 
                        className="w-12 h-12"
                    />
                </div>
            </div>

            {/* Authority Sign & Stamp */}
            <div className="flex flex-col items-center relative">
               {/* Stamp */}
               {assets?.stamp ? (
                   <img src={assets.stamp} alt="Stamp" className="absolute -top-12 -left-8 w-20 h-20 opacity-90 mix-blend-multiply pointer-events-none" />
               ) : (
                   <OfficialStamp className="absolute -top-12 -left-8 w-20 h-20 pointer-events-none mix-blend-multiply" />
               )}
               
               {/* Signature */}
               {assets?.signature ? (
                   <img src={assets.signature} alt="Sig" className="h-10 object-contain mb-1 relative z-10" />
               ) : (
                   <div className="h-10 relative z-10 flex items-end">
                       <span className="font-signature text-3xl text-black">Ad. Mohar Singh</span>
                   </div>
               )}
               
               <p className="text-[8px] font-bold text-slate-600 border-t border-slate-400 pt-0.5 px-2">National President</p>
            </div>
        </div>
        
        {/* Bottom Accent */}
        <div className={`h-2 w-full ${styles.bottomBar} absolute bottom-0`}></div>
      </div>
    </div>
  );
};