import { WaitlistSection } from '@/features/landing/_components/WaitlistSection'
import React from 'react'

function page() {
  return (
     <div className="w-full bg-white min-h-[70vh] flex flex-col items-center justify-center">
          <div className="w-full py-12">
            <WaitlistSection />
          </div>
        </div>
  )
}

export default page 