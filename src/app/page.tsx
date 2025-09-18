'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Phone, MessageCircle, Star, TrendingUp, Users, DollarSign, Clock, Award, Utensils, Calculator, HeadphonesIcon, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// 부드러운 스크롤 함수
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    const navHeight = 64 // 네비게이션 높이
    const elementPosition = element.offsetTop - navHeight - 10 // 10px 여백만 추가
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

export default function Page() {
  const [currentReview, setCurrentReview] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const reviews = [
    { name: "김○○", rating: 5, text: "진짜 무한리필이라니! 대창이 이렇게 맛있을 줄 몰랐어요", score: "5.0" },
    { name: "이○○", rating: 5, text: "가격 대비 정말 만족스러워요. 또 올게요!", score: "5.0" },
    { name: "박○○", rating: 4, text: "친구들과 와서 배터지게 먹었네요 ㅋㅋ", score: "4.0" },
    { name: "정○○", rating: 5, text: "사장님도 친절하시고 고기 질도 좋아요", score: "5.0" },
    { name: "최○○", rating: 5, text: "무한리필 맞나요? 이 가격에 이정도면 대박", score: "5.0" },
    { name: "한○○", rating: 4, text: "회식하기 좋은 곳이에요. 추천합니다!", score: "4.0" }
  ]
  
  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 스크롤 감지로 활성 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'reviews', 'sales', 'competitive', 'menu', 'cost', 'support', 'contact']
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // 섹션이 화면 상단에서 30% 지점에 있을 때 활성화
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 실행
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 리뷰 자동 슬라이딩 (3초마다)
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentReview(prevReview => {
        if (isMobile) {
          // 모바일: 1개씩 이동, 마지막(5)에서 처음(0)으로
          return prevReview >= reviews.length - 1 ? 0 : prevReview + 1;
        } else {
          // 데스크톱: 3개씩 보기, 마지막 그룹에서 처음으로
          return prevReview >= reviews.length - 3 ? 0 : prevReview + 1;
        }
      });
    }, 3000); // 3초마다 실행

    return () => clearInterval(autoSlide); // 컴포넌트 언마운트 시 정리
  }, [isMobile, reviews.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 에러 메시지 초기화
    setErrorMessage('')
    
    // 필수 필드 검사
    if (!name.trim()) {
      setErrorMessage('이름을 입력해주세요.')
      return
    }
    
    if (!phone.trim()) {
      setErrorMessage('연락처를 입력해주세요.')
      return
    }
    
    // 전화번호 형식 검사 (하이픈 선택사항, 10-11자리 숫자)
    const phoneDigits = phone.replace(/-/g, '')
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phoneDigits)) {
      setErrorMessage('올바른 전화번호 형식이 아닙니다. (10-11자리 숫자)')
      return
    }
    
    // EmailJS로 이메일 전송
    const SERVICE_ID = 'service_b4qgo4d' // EmailJS 서비스 ID
    const TEMPLATE_ID = 'template_xr2xtqp' // EmailJS 템플릿 ID
    const PUBLIC_KEY = 'iHRrl9HI7opOl-EWK' // EmailJS Public Key
    
    const templateParams = {
      from_name: name,
      phone: phone,
      region: region || '미입력',
      to_email: 'ew.hong@humanis.xyz',
    }
    
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )
      
      alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.')
      // 폼 초기화
      setName('')
      setPhone('')
      setRegion('')
    } catch (error) {
      console.error('이메일 전송 실패:', error)
      setErrorMessage('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const menuItems = [
    { name: "모듬특선", price: "시장가", image: "/images/menu/modum-special.jpg" },
    { name: "무한리필 (대인)", price: "29,000원", image: "/images/menu/modum-special.jpg" },
    { name: "무한리필 (소인)", price: "19,000원", image: "/images/menu/modum-special.jpg" },
    { name: "특양", price: "35,000원", image: "/images/menu/special-yang.jpg" },
    { name: "대창", price: "28,000원", image: "/images/menu/daechang.jpg" },
    { name: "막창", price: "25,000원", image: "/images/menu/makchang.jpg" },
    { name: "갈비살 200g", price: "15,000원", image: "/images/menu/galbi-200g.jpg" },
    { name: "갈비살 500g", price: "35,000원", image: "/images/menu/galbi-500g.jpg" },
    { name: "양밥", price: "3,000원", image: "/images/menu/yang-rice.jpg" },
    { name: "냉면", price: "8,000원", image: "/images/menu/naengmyeonjpg.jpg" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-md sticky top-0 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => smoothScrollTo('hero')}>
              <img 
                src="/images/logo.png" 
                alt="보성양대창 로고"
                className="h-10 w-auto mr-3 transition-transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              <h1 className="text-2xl font-bold fire-text korean-subtitle transition-all hover:scale-105" style={{display: 'none'}}>보성양대창</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => smoothScrollTo('reviews')} 
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'reviews' ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  리뷰
                </button>
                <button 
                  onClick={() => smoothScrollTo('sales')} 
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'sales' ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  매출
                </button>
                <button 
                  onClick={() => smoothScrollTo('competitive')} 
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'competitive' ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  가맹 경쟁력
                </button>
                <button 
                  onClick={() => smoothScrollTo('menu')} 
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'menu' ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  메뉴
                </button>
                <button 
                  onClick={() => smoothScrollTo('cost')} 
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'cost' ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  창업비용
                </button>
                <button 
                  onClick={() => smoothScrollTo('support')} 
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'support' ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  운영·지원 시스템
                </button>
                <button 
                  onClick={() => smoothScrollTo('contact')} 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    activeSection === 'contact' 
                      ? 'fire-gradient text-primary-foreground' 
                      : 'fire-gradient text-primary-foreground hover:opacity-90'
                  }`}
                >
                  가맹문의
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-[60vh] md:h-[80vh] flex items-center justify-center fire-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-primary-foreground w-full px-4 flex flex-col items-center justify-center h-full">
          <h1 className="korean-title fire-shadow mb-2 md:mb-4 hero-animate-title">
            <span className="font-light block md:inline">국내 최초</span>
            <span className="font-bold">무한리필 양대창구이</span>
          </h1>
          <div className="mb-4 md:mb-8 hero-animate-logo">
            <img 
              src="/images/hero_logo.png" 
              alt="보성양대창 로고"
              className="mx-auto h-16 md:h-24 w-auto fire-shadow"
            />
          </div>
          <button 
            onClick={() => smoothScrollTo('contact')} 
            className="bg-accent text-accent-foreground px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-lg hover:bg-accent/90 transition-all shadow-lg fire-shadow cursor-pointer hero-animate-button mb-3 md:mb-4"
          >
            지금 바로 상담 받기
          </button>
          <div className="hero-animate-phone">
            <a href="tel:010-7777-7777" className="text-2xl md:text-4xl font-bold text-white fire-shadow hover:scale-105 transition-transform inline-block">
              010-7777-7777
            </a>
          </div>
        </div>
        {/* Background Video Container */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: '50% 30%'  // 동영상의 상단 부분을 더 많이 보여주기
          }}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-charcoal-black/80 flex items-center justify-center">
            <p className="text-muted-foreground">동영상을 지원하지 않는 브라우저입니다.</p>
          </div>
        </video>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 korean-subtitle">고객 리뷰</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-accent mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">8.84 / 5.0</span>
              <span className="text-muted-foreground ml-2">방문자 리뷰 419</span>
              <span className="text-muted-foreground ml-2">블로그 리뷰 325</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Reviews Display - 모바일 1개, 데스크톱 3개 */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: isMobile 
                    ? `translateX(-${currentReview * 100}%)` // 모바일: 1개씩 이동
                    : `translateX(-${currentReview * (100 / 3)}%)` // 데스크톱: 3개씩 보기
                }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
                    <div className="bg-card p-6 rounded-lg shadow-md border border-border h-full flex flex-col">
                      <div className="flex items-center mb-3">
                        <div className="flex text-accent mr-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-accent">{review.score}</span>
                      </div>
                      <p className="text-foreground mb-3 flex-grow">"{review.text}"</p>
                      <p className="text-sm text-muted-foreground">- {review.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Review Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              {/* Left Arrow */}
              <button 
                onClick={() => {
                  if (isMobile) {
                    // 모바일: 1개씩 이동
                    setCurrentReview(currentReview === 0 ? reviews.length - 1 : currentReview - 1);
                  } else {
                    // 데스크톱: 3개씩 이동
                    setCurrentReview(currentReview === 0 ? reviews.length - 3 : currentReview - 1);
                  }
                }}
                className="bg-card p-2 rounded-full shadow-md hover:shadow-lg border border-border hover:bg-accent hover:text-accent-foreground transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Review Indicators */}
              <div className="flex space-x-2">
                {reviews.map((_, index) => {
                  let isActive;
                  if (isMobile) {
                    // 모바일: 현재 리뷰와 정확히 일치
                    isActive = index === currentReview;
                  } else {
                    // 데스크톱: 현재 보이는 3개 중 가운데 기준
                    const middleIndex = Math.min(currentReview + 1, reviews.length - 1);
                    isActive = index === middleIndex;
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isMobile) {
                          // 모바일: 클릭한 인덱스로 바로 이동
                          setCurrentReview(index);
                        } else {
                          // 데스크톱: 클릭한 리뷰가 가운데 오도록 계산
                          const targetReview = Math.max(0, Math.min(index - 1, reviews.length - 3));
                          setCurrentReview(targetReview);
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        isActive
                          ? 'bg-accent' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  );
                })}
              </div>
              
              {/* Right Arrow */}
              <button 
                onClick={() => {
                  if (isMobile) {
                    // 모바일: 1개씩 이동
                    setCurrentReview(currentReview >= reviews.length - 1 ? 0 : currentReview + 1);
                  } else {
                    // 데스크톱: 3개씩 이동
                    setCurrentReview(currentReview >= reviews.length - 3 ? 0 : currentReview + 1);
                  }
                }}
                className="bg-card p-2 rounded-full shadow-md hover:shadow-lg border border-border hover:bg-accent hover:text-accent-foreground transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Section */}
      <section id="sales" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 korean-subtitle">매출로 증명된 성장력</h2>
            <p className="text-xl text-muted-foreground">맛 · 원가 · 운영효율</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">월매출</h3>
              <p className="text-3xl font-bold fire-text">5,920만원</p>
                </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">순이익</h3>
              <p className="text-3xl font-bold text-accent">1,980만원</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">점주 운영 기준</h3>
              <p className="text-3xl font-bold fire-text">1,500만원</p>
            </div>
            </div>

          <div className="bg-muted p-8 rounded-lg border border-border">
            <h3 className="text-xl font-bold text-center mb-6 text-foreground">본점 손익 데이터 공개</h3>
            <div className="w-full h-64 bg-card rounded-lg flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded border border-border"></div>
                <p>손익 그래프 영역</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section id="competitive" className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 korean-subtitle">가맹 경쟁력</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-6 text-center text-foreground">원가율 비교</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded border border-primary/20">
                  <span className="font-semibold text-foreground">보성양대창</span>
                  <span className="text-primary font-bold">30~35%</span>
                  </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded border border-border">
                  <span className="font-semibold text-foreground">K사</span>
                  <span className="text-muted-foreground font-bold">40% 이상</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-6 text-center text-foreground">운영 효율성</h3>
              <div className="p-4 bg-primary/10 rounded border border-primary/20">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span className="text-foreground font-semibold">회전율 중심 매출 극대화</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span className="text-foreground font-semibold">단순 메뉴·조리 매뉴얼</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span className="text-foreground font-semibold">높은 운영 효율성</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-bold mb-8 text-center text-foreground">가맹 절차</h3>
            <div className="flex flex-col md:flex-row items-center justify-center">
              {[
                { step: '상담', stepNum: 'STEP_01' },
                { step: '상권분석', stepNum: 'STEP_02' },
                { step: '계약', stepNum: 'STEP_03' },
                { step: '교육', stepNum: 'STEP_04' },
                { step: '오픈', stepNum: 'STEP_05' }
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center bg-card p-3 rounded-lg border-4 border-gray-700 shadow-sm w-40">
                    <div className={`w-12 h-12 ${item.step === '교육' ? 'mr-2' : 'mr-3'} flex items-center justify-center`}>
                      {item.step === '상담' && <Phone className="w-12 h-12 text-accent" />}
                      {item.step === '상권분석' && <Calculator className="w-12 h-12 text-accent" />}
                      {item.step === '계약' && <Users className="w-12 h-12 text-accent" />}
                      {item.step === '교육' && <Award className="w-12 h-12 text-accent" />}
                      {item.step === '오픈' && <Utensils className="w-12 h-12 text-accent" />}
                    </div>
                    <div className="flex flex-col text-left flex-1">
                      <p className="text-xs font-bold text-muted-foreground tracking-wider mb-1">{item.stepNum}</p>
                      <p className="text-lg font-bold text-foreground">{item.step}</p>
                    </div>
                  </div>
                  {index < 4 && (
                    <div className="flex items-center justify-center my-4 md:my-0 md:mx-6 text-gray-400">
                      <ChevronDown className="w-6 h-6 md:hidden" />
                      <ChevronRight className="w-6 h-6 hidden md:block" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 korean-subtitle">메뉴</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="h-48 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-muted-foreground">이미지 로드 실패</span>';
                      }
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.name}</h3>
                  <p className="fire-text font-bold text-xl">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section id="cost" className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 korean-subtitle">창업비용</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-6 text-center fire-text">보성양대창</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <span className="font-semibold text-foreground">가맹비</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">1,000만원</span>
                    <p className="text-sm text-accent">10호점까지 면제 가능</p>
                  </div>
                    </div>
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <span className="font-semibold text-foreground">교육비</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">400만원</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="font-semibold text-foreground">로열티</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">매출 2%</span>
                    <p className="text-sm text-muted-foreground">20호점 미만 이후 10%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-6 text-center text-muted-foreground">타 가맹점 평균</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <span className="font-semibold text-foreground">가맹비</span>
                  <span className="text-lg font-bold text-foreground">946만원</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <span className="font-semibold text-foreground">교육비</span>
                  <span className="text-lg font-bold text-foreground">594만원</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <span className="font-semibold text-foreground">보증금</span>
                  <span className="text-lg font-bold text-foreground">300만원</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="font-semibold text-foreground">인테리어(평당)</span>
                  <span className="text-lg font-bold text-foreground">191만원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support System Section */}
      <section id="support" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 korean-subtitle">운영·지원 시스템</h2>
            <p className="text-xl fire-text font-semibold">"브랜드가 아니라 창업가를 키운다"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-card rounded-lg border border-border overflow-hidden h-full flex flex-col">
              {/* 이미지 영역 */}
              <div className="h-48 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                <img 
                  src="/images/education.jpg" 
                  alt="교육 시스템"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="flex items-center justify-center h-full"><span class="text-muted-foreground">교육 시스템</span></div>';
                    }
                  }}
                />
              </div>
              {/* 내용 영역 - 가로 2분할 */}
              <div className="p-6 flex items-stretch space-x-6 flex-grow min-h-[120px]">
                {/* 왼쪽: 아이콘 + 제목 */}
                <div className="flex flex-col items-center justify-center min-w-[100px] h-full">
                  <Award className="w-12 h-12 text-accent mb-2" />
                  <h3 className="text-xl font-bold text-foreground">교육</h3>
                </div>
                {/* 오른쪽: 리스트 */}
                <div className="flex-1 flex items-center justify-start">
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>조리·서비스</li>
                    <li>발주·오픈</li>
                    <li>SV 지원</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden h-full flex flex-col">
              {/* 이미지 영역 */}
              <div className="h-48 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                <img 
                  src="/images/logistic.jpg" 
                  alt="물류 시스템"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="flex items-center justify-center h-full"><span class="text-muted-foreground">물류 시스템</span></div>';
                    }
                  }}
                />
              </div>
              {/* 내용 영역 - 가로 2분할 */}
              <div className="p-6 flex items-stretch space-x-6 flex-grow min-h-[120px]">
                {/* 왼쪽: 아이콘 + 제목 */}
                <div className="flex flex-col items-center justify-center min-w-[100px] h-full">
                  <Clock className="w-12 h-12 text-accent mb-2" />
                  <h3 className="text-xl font-bold text-foreground">물류</h3>
                </div>
                {/* 오른쪽: 리스트 */}
                <div className="flex-1 flex items-center justify-start">
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>원부재료 공급</li>
                    <li>냉장 배송</li>
                    <li>품질 검수</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden h-full flex flex-col">
              {/* 이미지 영역 */}
              <div className="h-48 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                <img 
                  src="/images/marketing.jpg" 
                  alt="마케팅 시스템"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="flex items-center justify-center h-full"><span class="text-muted-foreground">마케팅 시스템</span></div>';
                    }
                  }}
                />
              </div>
              {/* 내용 영역 - 가로 2분할 */}
              <div className="p-6 flex items-stretch space-x-6 flex-grow min-h-[120px]">
                {/* 왼쪽: 아이콘 + 제목 */}
                <div className="flex flex-col items-center justify-center min-w-[100px] h-full">
                  <TrendingUp className="w-12 h-12 text-accent mb-2" />
                  <h3 className="text-xl font-bold text-foreground">마케팅 & 데이터</h3>
                </div>
                {/* 오른쪽: 리스트 */}
                <div className="flex-1 flex items-center justify-start">
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>네이버·리뷰 관리</li>
                    <li>지역 광고</li>
                    <li>POS·데이터 리포트</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 fire-gradient text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 korean-subtitle fire-shadow">가맹문의</h2>
            <div className="my-6">
              <a href="tel:010-7777-7777" className="text-4xl md:text-5xl font-bold text-white fire-shadow hover:scale-105 transition-transform inline-block">
                010-7777-7777
              </a>
            </div>
            <p className="text-xl fire-shadow">지금 바로 창업 상담 받기</p>
          </div>

          <div className="bg-card text-foreground p-8 rounded-lg border border-border shadow-lg">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">이름 *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setErrorMessage('')
                  }}
                  className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent" 
                  placeholder="이름을 입력하세요" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">연락처 *</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // 숫자와 하이픈만 허용
                    const filtered = value.replace(/[^0-9-]/g, '');
                    // 최대 13자리까지만 허용 (010-0000-0000 형식)
                    if (filtered.length <= 13) {
                      setPhone(filtered);
                    }
                    setErrorMessage('')
                  }}
                  className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent" 
                  placeholder="010-0000-0000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-foreground">희망지역</label>
                <input 
                  type="text" 
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value)
                  }}
                  className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent" 
                  placeholder="희망지역을 입력하세요" 
                />
              </div>
              {errorMessage && (
                <div className="md:col-span-2">
                  <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 px-4 rounded-md">
                    {errorMessage}
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <button type="submit" className="w-full fire-gradient text-primary-foreground py-3 px-6 rounded-md text-lg font-bold hover:opacity-90 transition-opacity shadow-lg">
                  상담 신청하기
                </button>
              </div>
            </form>
            </div>
          
          {/* Scroll to Top Button */}
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => smoothScrollTo('hero')}
              className="w-20 h-20 bg-charcoal-black rounded-full shadow-lg hover:bg-warm-brown transition-all flex flex-col items-center justify-center hover:scale-105 border-2 border-white"
            >
              <div className="text-yellow-400 text-lg font-bold mb-1">▲</div>
              <span className="text-yellow-400 text-xs font-bold">TOP</span>
            </button>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-card text-foreground py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img 
                src="/images/footer_logo.png" 
                alt="보성양대창 로고"
                className="h-12 w-auto mb-2"
                style={{display: 'block', margin: '0 auto 8px auto'}}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              <h3 className="text-xl font-bold mb-2 fire-text korean-subtitle" style={{display: 'none'}}>보성양대창</h3>
              <p className="text-sm text-muted-foreground" style={{textAlign: 'center'}}>국내 최초 무한리필 양대창구이</p>
            </div>
            <div className="text-center md:text-left">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>주소: 경기 수원시 팔달구 갓매산로56번길 13 1층 보성양대창</p>
                <p>전화: 010-7777-7777</p>
                <p>이메일: ew.hong@humanis.xyz</p>
              </div>
            </div>
            <div className="flex justify-center">
              <a 
                href="https://map.naver.com/p/entry/place/1916534227?lng=127.0052858&lat=37.2698166&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202509180924&locale=ko&svcName=map_pcv5&searchType=place&c=15.00,0,0,0,dh" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-secondary text-secondary-foreground px-6 h-10 rounded-lg font-semibold hover:bg-secondary/80 transition-all shadow-md"
              >
                네이버 예약 바로가기
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 보성양대창. All rights reserved.</p>
          </div>
        </div>
      </footer>


      {/* Floating Contact Button - Desktop Circle, Mobile Bottom Bar */}
      <div className="fixed bottom-0 md:bottom-6 left-0 md:left-auto right-0 md:right-6 z-50">
        <button 
          onClick={() => smoothScrollTo('contact')}
          className="
            w-full md:w-28 
            h-16 md:h-28 
            bg-accent text-accent-foreground 
            rounded-none md:rounded-full 
            shadow-xl hover:bg-accent/90 transition-all 
            flex md:flex-col items-center justify-center 
            border-t-2 md:border-4 border-white 
            hover:scale-100 md:hover:scale-105
          "
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-0 md:mb-1" />
          <span className="text-base md:text-sm font-bold leading-tight">
            <span className="inline md:hidden">지금 문의하세요</span>
            <span className="hidden md:inline">지금<br/>문의하세요</span>
          </span>
        </button>
      </div>
    </div>
  )
}