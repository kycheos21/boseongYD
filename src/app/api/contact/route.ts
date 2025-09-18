import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, location, message } = body

    // 기본 유효성 검사
    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수입니다.' },
        { status: 400 }
      )
    }

    // 여기서 실제 이메일 서비스를 사용할 수 있습니다
    // 예: Nodemailer, SendGrid, Resend 등
    // 현재는 로그만 출력하고 성공 응답을 보냅니다
    console.log('창업 상담 신청:', {
      name,
      phone,
      location,
      message,
      timestamp: new Date().toISOString()
    })

    // 실제 프로덕션에서는 여기서 이메일을 보내게 됩니다
    // await sendEmail({
    //   to: 'franchise@chodaechang.co.kr',
    //   subject: '새로운 창업 상담 신청',
    //   html: `
    //     <h2>새로운 창업 상담 신청이 접수되었습니다</h2>
    //     <p><strong>성함:</strong> ${name}</p>
    //     <p><strong>연락처:</strong> ${phone}</p>
    //     <p><strong>희망 지역:</strong> ${location}</p>
    //     <p><strong>문의사항:</strong> ${message}</p>
    //   `
    // })

    return NextResponse.json({
      success: true,
      message: '창업 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
    })

  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: '신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}
