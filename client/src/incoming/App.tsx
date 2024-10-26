
// import React, { useState } from 'react';
// import { Phone, PhoneOff, ChevronUp } from 'lucide-react';

// function App() {
//   const [isAnswering, setIsAnswering] = useState(false);
//   const [isDeclining, setIsDeclining] = useState(false);
//   const [showControls, setShowControls] = useState(true);

//   const handleAnswer = () => {
//     setIsAnswering(true);
//     setTimeout(() => setShowControls(false), 300);
//   };

//   const handleDecline = () => {
//     setIsDeclining(true);
//     setTimeout(() => setShowControls(false), 300);
//   };

//   return (
//     <div className="min-h-screen bg-[#262626] flex items-center justify-center p-4">
//         <div className="w-full max-w-sm mx-auto relative">
//           {/* Caller Info */}
//           <div className="text-center mb-8 animate-fade-in">
//             <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
//                 alt="Caller"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h1 className="text-white text-3xl font-semibold mb-1">John Doe</h1>
//             <p className="text-gray-400 text-lg">mobile</p>
//           </div>

//           {/* Call Controls */}
//           {showControls && (
//             <div className="space-y-12">
//               {/* Reminder Text */}
//               <div className="text-center">
//                 <p className="text-white text-sm mb-1">Remind Me</p>
//                 <div className="flex items-center justify-center space-x-1 text-white/80">
//                   <ChevronUp className="w-4 h-4" />
//                   <p className="text-sm">swipe up to respond with message</p>
//                 </div>
//               </div>

//               {/* Call Buttons */}
//               <div className="grid grid-cols-2 gap-24 px-4">
//                 {/* Decline Button */}
//                 <button
//                   onClick={handleDecline}
//                   className={`flex flex-col items-center space-y-2 transition-transform ${
//                     isDeclining ? 'scale-95' : ''
//                   }`}
//                 >
//                   <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
//                     <PhoneOff className="w-8 h-8 text-white transform rotate-135" />
//                   </div>
//                   <span className="text-white text-lg">Decline</span>
//                 </button>

//                 {/* Accept Button */}
//                 <button
//                   onClick={handleAnswer}
//                   className={`flex flex-col items-center space-y-2 transition-transform ${
//                     isAnswering ? 'scale-95' : ''
//                   }`}
//                 >
//                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <span className="text-white text-lg">Accept</span>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Post-Action Message */}
//           {!showControls && (
//             <div className="text-center text-white text-xl animate-fade-in">
//               {isAnswering ? 'Call Connected...' : 'Call Declined'}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

export {}
