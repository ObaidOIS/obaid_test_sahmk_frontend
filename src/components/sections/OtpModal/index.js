import InputFieldUI from '@/components/widgets/InputFieldUI'
import PrimaryButton from '@/components/widgets/PrimaryButton'
import Image from 'next/image'
import React from 'react'

const OtpModal = () => {
  return (
    <div>
        <div className='flex justify-center'>
            <Image src="/assets/icons/mail-fast.svg" width={32} height={32} className="" alt="img" />
        </div>
        <p className='text-sm font-medium text-center mt-8'>يرجى إدخال الرمز المرسل إلى جوالك</p>
        <div className='flex gap-4 my-5'>
            <InputFieldUI maxlength="1" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" buttonStyle="text-center" />
            </div>
            <div>
                <p className='text-sm font-medium text-right'>إعادة ارسال الرمز بعد  22:00</p>
            </div>
            <div>
                <PrimaryButton
                  button="دخول"
                  buttonStyle="py-3 rounded-md !font-normal w-full justify-center mt-6" 
                />
            </div>

    </div>
  )
}

export default OtpModal
