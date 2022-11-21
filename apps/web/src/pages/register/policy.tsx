import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const schema = Joi.object({
  policyAgreement: Joi.boolean().invalid(false).required(),
})

interface PolicyProps {
  register: UseFormRegister<{
    policyAgreement: boolean
  }>
}

const THPolicy: FC<PolicyProps> = ({ register }) => {
  return (
    <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
      <h1 className="mb-4 text-center font-heading text-3xl font-bold">การให้สิทธิ์กับเจ้าของข้อมูลส่วนบุคคล</h1>
      <div className="min-h-[24rem] space-y-5 overflow-hidden rounded-xl bg-white p-10 text-black shadow-lg sm:p-5 sm:shadow-none">
        <div>
          <ol className="list-inside list-disc">
            <li>
              คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยมหิดล จะเก็บรวบรวมข้อมูลส่วนบุคคลของผู้ใช้บริการของคณะฯ
              เท่าที่จำเป็น ได้แก่{' '}
              <span className="font-bold text-dst-prussian-blue">
                ชื่อ นามสกุล อีเมล หมายเลขโทรศัพท์ จังหวัดที่อยู่อาศัย ชื่อสถานศึกษาและระดับการศึกษา เป็นต้น
              </span>{' '}
              โดยขึ้นอยู่กับประเภทของการรับบริการที่ท่านใช้ผ่านเว็บไซต์ของคณะฯ
            </li>
            <li>
              คณะฯ จะใช้ข้อมูลส่วนบุคคลของท่านเพื่อประโยชน์ในการให้บริการ และการดำเนินการตามวัตถุประสงค์และภารกิจของคณะฯ
              ภายใต้ขอบเขตของกฎหมายที่เกี่ยวข้อง รวมถึงรับทราบข่าวสารกิจกรรมของคณะฯ
            </li>
            <li>
              <span className="font-bold text-dst-prussian-blue">
                คณะฯ จะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สาม
              </span>{' '}
              เพื่อนำไปใช้ในการดำเนินกิจกรรมที่ไม่เกี่ยวข้อง เว้นแต่จะได้รับความยินยอมจากเจ้าของข้อมูล
              หรือเป็นกรณีที่มีกฎหมายกำหนดให้กระทำได้เท่านั้น
            </li>
            <li>
              หากท่านประสงค์เปลี่ยนแปลงหรือแก้ไขข้อมูลส่วนบุคคล สามารถส่งข้อมูลที่ท่านต้องการแก้ไข
              รวมถึงประสงค์จะขอลบข้อมูลส่วนบุคคลมาที่{' '}
              <a href="mailto:tanakorn.kan@mahidol.ac.th">tanakorn.kan@mahidol.ac.th</a> หรือ{' '}
              <a href="mailto:prach.cha@mahidol.ac.th">prach.cha@mahidol.ac.th</a>
            </li>
          </ol>
        </div>

        <div className="bg-dst-sunglow/20 p-5">
          <h3 className="mb-2 text-center font-heading font-bold">ในระหว่างกิจกรรม ICT Mahidol Open House</h3>
          <ol className="list-inside list-disc">
            <li>
              จะมีการบันทึกภาพ เสียง คลิปเพื่อเผยแพร่ภาพถ่าย วิดีโอ เนื้อหา ข้อมูลต่าง ๆ บนเว็บไซต์ บนอินเตอร์เน็ต
              กระดาษข่าวอื่น ๆ ในที่สาธารณะ หรือตามสถานที่ใดๆ เพื่อเป็น สื่อกลาง
              ในการสื่อสารกับสังคมและเป็นประโยชน์ต่อการศึกษาเท่านั้น
            </li>
            <li>
              ข้อมูลส่วนบุคคลจะถูกเก็บรักษาไว้เป็นความลับจนกว่าการดำเนินงานตามวัตถุประสงค์ของคณะเทคโนโลยีสารสนเทศและการสื่อสาร
              มหาวิทยาลัยมหิดลสิ้นสุดลง
            </li>
          </ol>
        </div>

        <div>
          <div>
            <input
              type="checkbox"
              className="mr-2"
              id="policyAgreement"
              data-test="policy-agreement"
              {...register('policyAgreement')}
            />
            <label htmlFor="policyAgreement">
              ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการเปิดเผยข้อมูลส่วนบุคคลซึ่งระบุไว้ด้านบนนี้อย่างชัดเจนแล้ว
            </label>
          </div>
        </div>
        <div>
          ท่านสามารถดูรายละเอียดเพิ่มเติมได้ที่ประกาศมหาวิทยาลัยมหิดล{' '}
          <a
            href="https://privacy.mahidol.ac.th/mu-privacy-policy-th/"
            target="_blank"
            className="text-ict-magenta-process hover:underline"
            rel="noreferrer"
          >
            &quot;นโยบายการคุ้มครองข้อมูลส่วนบุคคล พ.ศ.๒๕๖๓&quot;
          </a>
          &quot;
        </div>
      </div>
    </div>
  )
}

const ENPolicy: FC<PolicyProps> = ({ register }) => {
  return (
    <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
      <h1 className="mb-4 text-center font-heading text-3xl font-bold">Privacy Notice</h1>
      <div className="min-h-[24rem] space-y-5 overflow-hidden rounded-xl bg-white p-10 text-black shadow-lg sm:p-5 sm:shadow-none">
        <div>
          <ol className="list-inside list-disc">
            <li>
              The Faculty of Information and Communication Technology, Mahidol University shall collect some necessary
              personal data of a visitor such as{' '}
              <span className="font-bold text-dst-prussian-blue">
                name, last name, email, telephone number, residential province, name of school and education level,
                etc.,
              </span>{' '}
              depending on type of a visitor.
            </li>
            <li>
              The Faculty of ICT shall use your personal data for the purposes of providing services, proceeding with
              its objectives and missions which are under scopes of the relevant law, as well as delivering news from
              the Faculty of ICT.
            </li>
            <li>
              <span className="font-bold text-dst-prussian-blue">
                The Faculty of ICT shall not disclose your personal data to third parties,
              </span>{' '}
              to be used for unrelated activities, except with the consent of the data subject or in cases where the law
              is required to do so only.
            </li>
            <li>
              In case that you would like to change, edit or delete any of your personal data, you can send a request
              via email: <a href="mailto:tanakorn.kan@mahidol.ac.th">tanakorn.kan@mahidol.ac.th</a> or{' '}
              <a href="mailto:prach.cha@mahidol.ac.th">prach.cha@mahidol.ac.th</a>
            </li>
          </ol>
        </div>

        <div className="bg-dst-sunglow/20 p-5">
          <h3 className="mb-2 text-center font-heading font-bold">
            During the activity &quot;ICT Mahidol Open House&quot;
          </h3>
          <ol className="list-inside list-disc">
            <li>
              The Faculty of ICT will record pictures/videos which shall be used in any public media directly or
              indirectly under the name of the Faculty of ICT, Mahidol University for the benefit of education only.
              Your personal data shall be kept confidentially until the completion of the Faculty of ICT&apos;s
              objectives.
            </li>
          </ol>
        </div>

        <div>
          <div>
            <input
              type="checkbox"
              className="mr-2"
              id="policyAgreement"
              data-test="policy-agreement"
              {...register('policyAgreement')}
            />
            <label htmlFor="policyAgreement">
              I have read and understood the terms and conditions for disclosure of the personal information mentioned
              above.
            </label>
          </div>
        </div>
        <div>
          You can read more information at Mahidol University Announcement{' '}
          <a
            href="https://privacy.mahidol.ac.th/mu-privacy-policy-th/"
            target="_blank"
            className="text-ict-magenta-process hover:underline"
            rel="noreferrer"
          >
            &quot;Re: Personal Data Protection Policy B.E.2563 (A.D.2020)&quot;
          </a>
          &quot;
        </div>
      </div>
    </div>
  )
}

const Page: NextPage = () => {
  const { locale = 'th' } = useRouter()
  const { t } = useTranslation('register')
  const { t: tCommon } = useTranslation('common')
  const { push } = useRouter()
  const { form, dispatch } = useStoreon('form')
  const { register, watch, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      policyAgreement: form.register.fields?.policyAgreement || false,
    },
  })

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          data-test="policy-form"
          onSubmit={handleSubmit((data) => {
            dispatch('form/register/setFields', data)
            dispatch('form/register/nextStep')
            push('/register/info')
          })}
        >
          {locale === 'th' ? <THPolicy register={register} /> : <ENPolicy register={register} />}
          <div className="mt-10 flex justify-between gap-5">
            <Button
              label={tCommon('BUTTON_LABEL.BACK')}
              variant="primary"
              className="w-full sm:w-32"
              onClick={() => {
                dispatch('form/register/prevStep')
                push('/register/type')
              }}
            />
            <Button
              type="submit"
              label={t('REG_FORM.REG_BUTTON_NEXT')}
              variant="ictTurquoise"
              className="w-full sm:w-32"
              disabled={watch('policyAgreement') === false}
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page
