import Image from 'next/image';
import { memo } from 'react';

import { DUCK_TELEGRAM_URL, lato } from '@jobstash/shared/core';

import { HomePageButton } from './buttons/home-page-button';
import { GradientContainer } from './gradient-container';

const TestimonialSection = () => (
  <section className="relative mx-auto mt-8 md:mt-16 lg:max-w-6xl">
    <div className="z-10 w-full pt-12 lg:py-0">
      <h3
        className={`${lato.className} text-white text-center !leading-tight font-black text-5xl md:text-6xl text-center6`}
      >
        Testimonials
      </h3>
      <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
        Some of the best organizations have found talent using JobStash. Here’s
        what they had to say
      </p>
      <div className="flex flex-wrap mt-10">
        <div className="flex flex-wrap mb-4 space-y-5 md:mb-0 md:-mx-3 md:space-y-0">
          <div className="w-full px-3 md:h-full md:w-1/3">
            <div className="flex flex-wrap justify-start p-5 bg-white md:h-full rounded-3xl bg-opacity-5">
              <div className="h-[60px] w-[60px] mx-auto mb-6">
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    fill
                    alt="placeholder"
                    className="object-cover object-center rounded-full "
                    src="/najdana_majors.png"
                  />
                </div>
              </div>
              <p className="text-left text-md text-white/75 grow">
                One of our recent hires found the job through JobStash. If you
                are looking for your next opportunity, I highly recommend
                checking out their platform!
              </p>
              <hr className="mt-6 mb-3 border-t border-white/20" />
              <div className="min-h-[88px]">
                <p className="font-semibold text-white text-md">
                  Najdana Majors
                </p>
                <p className="font-semibold text-white text-md">
                  Talent, Everclear
                </p>
                <div className="[&>svg]:w-[100px] mt-3">
                  <svg
                    width="121"
                    height="36"
                    viewBox="0 0 121 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.5189 2.76421L21.0841 0.128475C21.6036 -0.171472 22.0248 0.0716831 22.0248 0.671577C22.0248 1.27147 21.6036 2.00094 21.0841 2.30088L16.5189 4.93662C15.9993 5.23657 15.5782 4.99341 15.5782 4.39352C15.5782 3.79363 15.9993 3.06416 16.5189 2.76421ZM16.5189 7.40533L21.0841 4.76959C21.6036 4.46964 22.0248 4.7128 22.0248 5.31269C22.0248 5.91258 21.6036 6.64205 21.0841 6.942L16.5189 9.57773C15.9993 9.87768 15.5782 9.63453 15.5782 9.03463C15.5782 8.43474 15.9993 7.70528 16.5189 7.40533ZM30.8804 29.6787V24.4072C30.8804 23.8073 30.4593 23.0778 29.9397 22.7779C29.4202 22.4779 28.9991 22.7211 28.9991 23.321V28.5925C28.9991 29.1924 29.4202 29.9218 29.9397 30.2218C30.4593 30.5217 30.8804 30.2786 30.8804 29.6787ZM26.8609 22.0864V27.3579C26.8609 27.9578 26.4397 28.2009 25.9202 27.901C25.4007 27.601 24.9795 26.8716 24.9795 26.2717V21.0002C24.9795 20.4003 25.4007 20.1571 25.9202 20.4571C26.4397 20.757 26.8609 21.4865 26.8609 22.0864ZM26.4357 8.51643L18.4006 13.1555C18.335 13.1934 18.2643 13.2265 18.1897 13.2548L16.5189 14.2194C15.9993 14.5194 15.5782 14.2762 15.5782 13.6763C15.5782 13.0765 15.9993 12.347 16.5189 12.047L21.0841 9.4113C21.1497 9.37344 21.2137 9.34424 21.2755 9.32331L24.5544 7.43023C25.0739 7.13028 25.9162 7.13028 26.4357 7.43023C26.9553 7.73017 26.9553 8.21648 26.4357 8.51643ZM29.9422 9.45003L34.5074 12.0858C35.027 12.3857 35.027 12.872 34.5074 13.172C33.9879 13.4719 33.1456 13.4719 32.6261 13.172L28.0608 10.5362C27.5413 10.2363 27.5413 9.74997 28.0608 9.45003C28.5804 9.15008 29.4227 9.15008 29.9422 9.45003ZM30.4879 14.4066L25.9227 11.7708C25.4031 11.4709 24.5608 11.4709 24.0413 11.7708C23.5218 12.0708 23.5218 12.5571 24.0413 12.857L28.6065 15.4928C29.1261 15.7927 29.9684 15.7927 30.4879 15.4928C31.0074 15.1928 31.0074 14.7065 30.4879 14.4066ZM26.4686 16.7271L21.9034 14.0914C21.3839 13.7914 20.5415 13.7914 20.022 14.0914C19.5025 14.3913 19.5025 14.8776 20.022 15.1776L21.8482 16.2319C21.8655 16.243 21.883 16.2536 21.9006 16.2638L29.9357 20.9029C30.4553 21.2029 30.8764 20.9597 30.8764 20.3598C30.8764 19.7599 30.4553 19.0304 29.9357 18.7305L26.5196 16.7582C26.5032 16.7476 26.4862 16.7373 26.4686 16.7271ZM22.841 19.7658L22.841 25.0373C22.841 25.1134 22.8342 25.1837 22.8214 25.248V29.0332C22.8214 29.6331 22.4002 30.3626 21.8807 30.6625C21.3611 30.9625 20.94 30.7193 20.94 30.1194V20.8412C20.94 20.7651 20.9468 20.6869 20.9597 20.6078V18.6796C20.9597 18.0797 21.3808 17.8365 21.9003 18.1365C22.4199 18.4364 22.841 19.1659 22.841 19.7658ZM18.3777 32.6898L13.8125 35.3255C13.293 35.6255 12.8718 35.3823 12.8718 34.7824C12.8718 34.1825 13.293 33.4531 13.8125 33.1531L18.3777 30.5174C18.8973 30.2174 19.3184 30.4606 19.3184 31.0605C19.3184 31.6604 18.8973 32.3898 18.3777 32.6898ZM13.8125 30.6839L18.3777 28.0482C18.8973 27.7482 19.3184 27.0188 19.3184 26.4189C19.3184 25.819 18.8973 25.5758 18.3777 25.8758L13.8125 28.5115C13.293 28.8115 12.8718 29.5409 12.8718 30.1408C12.8718 30.7407 13.293 30.9839 13.8125 30.6839ZM19.3184 21.7772C19.3184 22.2858 19.0157 22.8875 18.607 23.2417C18.5473 23.3051 18.471 23.3648 18.378 23.4185L10.3428 28.0576C9.82331 28.3575 8.98099 28.3575 8.46147 28.0576C7.94195 27.7576 7.94195 27.2713 8.46147 26.9714L13.6716 23.9633C13.7176 23.9288 13.7646 23.8975 13.8125 23.8699L18.3777 21.2341C18.8973 20.9342 19.3184 21.1773 19.3184 21.7772ZM0.389642 23.4019L4.95488 26.0377C5.4744 26.3376 6.31671 26.3376 6.83624 26.0377C7.35576 25.7377 7.35576 25.2514 6.83624 24.9514L2.271 22.3157C1.75148 22.0158 0.909165 22.0158 0.389642 22.3157C-0.129881 22.6157 -0.129881 23.102 0.389642 23.4019ZM8.97441 23.7169L4.40917 21.0811C3.88965 20.7812 3.88965 20.2949 4.40917 19.9949C4.9287 19.695 5.77101 19.695 6.29053 19.9949L10.8558 22.6306C11.3753 22.9306 11.3753 23.4169 10.8558 23.7169C10.3362 24.0168 9.49393 24.0168 8.97441 23.7169ZM4.98077 14.5847L13.0159 19.2238C13.0653 19.2523 13.1138 19.2847 13.1612 19.3206L14.8751 20.3101C15.3946 20.61 15.3946 21.0963 14.8751 21.3963C14.3555 21.6962 13.5132 21.6962 12.9937 21.3963L8.42847 18.7605C8.37907 18.732 8.33436 18.7018 8.29436 18.6702L4.98077 16.7571C4.46125 16.4572 4.04009 15.7277 4.04009 15.1278C4.04009 14.5279 4.46125 14.2848 4.98077 14.5847ZM4.03618 11.0805L4.03618 5.80901C4.03618 5.20911 4.45734 4.96596 4.97686 5.26591C5.49639 5.56585 5.91754 6.29532 5.91754 6.89521V12.1667C5.91754 12.7666 5.49639 13.0097 4.97686 12.7098C4.45734 12.4098 4.03618 11.6804 4.03618 11.0805ZM8.05571 8.12981V13.4013C8.05571 14.0012 8.47687 14.7306 8.99639 15.0306C9.51592 15.3305 9.93707 15.0874 9.93707 14.4875V9.21601C9.93707 8.61612 9.51592 7.88665 8.99639 7.58671C8.47687 7.28676 8.05571 7.52992 8.05571 8.12981ZM13.9566 5.33436V11.5078L12.0752 15.6988V6.42056C12.0752 5.82067 12.4964 5.09121 13.0159 4.79126C13.5354 4.49131 13.9566 4.73447 13.9566 5.33436ZM13.9566 11.5078L12.0756 15.7281C12.0783 16.3269 12.4984 17.0525 13.0163 17.3515C13.5358 17.6514 13.9569 17.4083 13.9569 16.8084V11.5369C13.9569 11.5273 13.9568 11.5176 13.9566 11.5078Z"
                      fill="white"
                    />
                    <path
                      d="M48.8315 22.7266V10.5716H57.7735V12.6456H51.2965V15.3656H56.9745V17.3886H51.2965V20.6696H57.8245V22.7266H48.8315ZM61.3902 22.7266L58.3642 14.0056H60.7102L62.1042 18.5276C62.3592 19.3606 62.4952 19.9216 62.4952 19.9216H62.5292C62.5292 19.9216 62.6482 19.3606 62.9032 18.5276L64.3312 14.0056H66.6432L63.6002 22.7266H61.3902ZM71.6168 22.9816C68.7268 22.9816 67.0948 20.9586 67.0948 18.3576C67.0948 15.7736 68.8458 13.7676 71.3958 13.7676C74.2008 13.7676 75.6968 15.9096 75.6968 19.0206H69.3728C69.5428 20.3636 70.2908 21.1966 71.5998 21.1966C72.5008 21.1966 73.0278 20.7886 73.2828 20.1256H75.5608C75.2378 21.6726 73.8608 22.9816 71.6168 22.9816ZM71.4298 15.5526C70.2058 15.5526 69.6108 16.2836 69.4068 17.4226H73.2828C73.2148 16.3176 72.4838 15.5526 71.4298 15.5526ZM79.3339 14.0056V15.3996H79.3849C79.9119 14.4136 80.5069 13.9036 81.5269 13.9036C81.7819 13.9036 81.9349 13.9206 82.0709 13.9716V15.9946H82.0199C80.5069 15.8416 79.4189 16.6406 79.4189 18.4766V22.7266H77.1069V14.0056H79.3339ZM87.2038 22.9816C84.4498 22.9816 82.7328 20.9756 82.7328 18.3746C82.7328 15.7736 84.4328 13.7676 87.0848 13.7676C89.3458 13.7676 90.7398 15.0766 91.0458 16.9636H88.7848C88.6318 16.1986 88.0368 15.6206 87.1868 15.6206C85.7928 15.6206 85.0788 16.6916 85.0788 18.3746C85.0788 20.0236 85.7418 21.1286 87.1528 21.1286C88.0878 21.1286 88.7508 20.6356 88.9038 19.6496H91.1308C90.9778 21.5026 89.5328 22.9816 87.2038 22.9816ZM92.5133 22.7266V10.5716H94.8253V22.7266H92.5133ZM100.784 22.9816C97.8944 22.9816 96.2624 20.9586 96.2624 18.3576C96.2624 15.7736 98.0134 13.7676 100.563 13.7676C103.368 13.7676 104.864 15.9096 104.864 19.0206H98.5404C98.7104 20.3636 99.4584 21.1966 100.767 21.1966C101.668 21.1966 102.195 20.7886 102.45 20.1256H104.728C104.405 21.6726 103.028 22.9816 100.784 22.9816ZM100.597 15.5526C99.3734 15.5526 98.7784 16.2836 98.5744 17.4226H102.45C102.382 16.3176 101.651 15.5526 100.597 15.5526ZM111.765 22.7266C111.629 22.5566 111.544 22.1486 111.493 21.7576H111.459C111.017 22.4206 110.388 22.9306 108.892 22.9306C107.107 22.9306 105.849 21.9956 105.849 20.2616C105.849 18.3406 107.413 17.7286 109.351 17.4566C110.796 17.2526 111.459 17.1336 111.459 16.4706C111.459 15.8416 110.966 15.4336 109.997 15.4336C108.909 15.4336 108.382 15.8246 108.314 16.6576H106.257C106.325 15.1276 107.464 13.7846 110.014 13.7846C112.632 13.7846 113.686 14.9576 113.686 16.9976V21.4346C113.686 22.0976 113.788 22.4886 113.992 22.6416V22.7266H111.765ZM109.453 21.3156C110.779 21.3156 111.51 20.4996 111.51 19.6496V18.3406C111.102 18.5786 110.473 18.7146 109.895 18.8506C108.688 19.1226 108.093 19.3946 108.093 20.2106C108.093 21.0266 108.637 21.3156 109.453 21.3156ZM117.723 14.0056V15.3996H117.774C118.301 14.4136 118.896 13.9036 119.916 13.9036C120.171 13.9036 120.324 13.9206 120.46 13.9716V15.9946H120.409C118.896 15.8416 117.808 16.6406 117.808 18.4766V22.7266H115.496V14.0056H117.723Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-3 md:h-full md:w-1/3">
            <div className="flex flex-wrap justify-start p-5 bg-white md:h-full rounded-3xl bg-opacity-5">
              <div className="h-[60px] w-[60px] mx-auto mb-6">
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    fill
                    alt="placeholder"
                    className="object-cover object-center rounded-full"
                    src="/ivan-gbi.jpg"
                  />
                </div>
              </div>
              <p className="text-left text-md text-white/75 grow">
                JobStash supported us in finding new talent for Gearbox, and
                supported us in giving more exposure to our vacancies thanks to
                featuring, which got us way more inbound and ultimately a
                successful hire.
              </p>
              <hr className="mt-6 mb-3 border-t border-white/20" />
              <div className="min-h-[88px]">
                <p className="font-semibold text-white text-md">ivangbi</p>
                <p className="font-semibold text-white text-md">
                  Core member, Gearbox DAO
                </p>
                <div className="mt-3 w-[100px]">
                  <div className="aspect-w-16 aspect-h-6">
                    <Image
                      fill
                      alt="placeholder"
                      className="object-contain object-center "
                      src="/gearbox.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-3 md:h-full md:w-1/3">
            <div className="flex flex-wrap justify-start p-5 bg-white md:h-full rounded-3xl bg-opacity-5">
              <div className="h-[60px] w-[60px] mx-auto mb-6">
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    fill
                    alt="placeholder"
                    className="object-cover object-center rounded-full"
                    src="/0xJMG.jpg"
                  />
                </div>
              </div>
              <p className="text-left text-md text-white/75 grow">
                In a sea of job platforms, JobStash shines with its unique and
                uncomplicated approach to job aggregation and led by an
                authentic team that genuinely want to help match the best
                talent. Really cool UX and free!
              </p>
              <hr className="mt-6 mb-3 border-t border-white/20" />
              <div className="min-h-[88px]">
                <p className="font-semibold text-white text-md">
                  James Glasscock
                </p>
                <p className="font-semibold text-white text-md">
                  Head of Ecosystem, Reserve Protocol
                </p>

                <div className="[&>svg]:w-[80px] mt-3">
                  <svg
                    width="118"
                    height="25"
                    viewBox="0 0 118 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.26107 24.0476V14.9955H0V11.3089H4.26107V9.99928H0V6.39535H4.26107V0.525391H13.9407C16.4777 0.525391 18.3557 1.1221 19.5735 2.31521C20.7913 3.49695 21.4008 5.32059 21.4008 7.78644C21.4008 9.65558 20.9517 11.1583 20.052 12.2948C19.1522 13.4197 17.902 14.2027 16.2957 14.642L21.7418 24.0476H16.7055L11.7036 15.0134H8.80248V24.0476H4.26107ZM8.80248 11.3157H14.5388C15.9612 11.3157 16.6728 10.5327 16.6728 8.96818V6.55275C16.6728 5.76482 16.5136 5.20223 16.194 4.86345C15.8877 4.51483 15.3353 4.33991 14.5388 4.33991H8.80248V11.3157ZM21.9368 15.1997C21.9368 13.8153 22.1303 12.5604 22.517 11.434C22.9039 10.2975 23.4445 9.32817 24.1397 8.52887C24.8459 7.71819 25.6931 7.09412 26.6831 6.65482C27.6731 6.21551 28.771 5.99662 29.9774 5.99662C31.1837 5.99662 32.2767 6.21059 33.2552 6.63852C34.2449 7.06645 35.0875 7.65671 35.7823 8.41205C36.4871 9.15448 37.023 10.0445 37.3868 11.0805C37.762 12.1165 37.9506 13.2365 37.9506 14.4409V16.62H26.4965V17.7854C26.4965 18.8439 26.8439 19.6659 27.5371 20.2513C28.2419 20.8249 29.0727 21.1121 30.0299 21.1121C30.9853 21.1121 31.7655 20.864 32.3685 20.3696C32.9715 19.8734 33.3307 19.1762 33.4438 18.2751H37.8146C37.5296 20.2334 36.6935 21.7589 35.3054 22.8515C33.9287 23.9327 32.1521 24.4725 29.9789 24.4725C28.7154 24.4725 27.5829 24.2472 26.5814 23.7965C25.5918 23.3458 24.7492 22.7153 24.0544 21.9046C23.371 21.0942 22.848 20.1197 22.4842 18.9834C22.1189 17.8454 21.9368 16.5843 21.9368 15.1997ZM26.4946 13.2577H33.4766V12.6336C33.4766 11.6658 33.1471 10.8779 32.4865 10.2698C31.826 9.66204 30.9903 9.35892 29.9774 9.35892C28.9759 9.35892 28.1451 9.66358 27.4846 10.2698C26.8241 10.8779 26.4946 11.6658 26.4946 12.6336V13.2577ZM39.2373 18.4421H43.6081C43.7902 20.2202 44.8652 21.1102 46.8353 21.1102C47.6775 21.1102 48.3937 20.958 48.9856 20.6549C49.5772 20.3404 49.8739 19.8442 49.8739 19.1682C49.8739 18.5263 49.6294 18.0643 49.1395 17.7839C48.6496 17.4903 48.007 17.26 47.2105 17.0916L44.1376 16.4334C41.1564 15.7915 39.6651 14.1086 39.6651 11.3851C39.6651 10.62 39.819 9.91013 40.1256 9.25839C40.4434 8.60511 40.899 8.03761 41.4909 7.5528C42.0825 7.0683 42.8051 6.69201 43.6591 6.42148C44.5128 6.13926 45.4849 6 46.5778 6C48.6036 6 50.2655 6.4845 51.5618 7.45227C52.86 8.42035 53.553 9.884 53.6448 11.8423H49.274C49.2279 11.0092 48.9609 10.39 48.471 9.98453C47.9823 9.56797 47.3499 9.36045 46.5763 9.36045C45.8255 9.36045 45.211 9.52431 44.7326 9.85018C44.2655 10.1647 44.0328 10.6104 44.0328 11.1841C44.0328 11.7581 44.2096 12.186 44.5619 12.4682C44.9257 12.7387 45.398 12.9352 45.9797 13.06L49.5132 13.8203C50.1623 13.9546 50.7768 14.1575 51.3569 14.428C51.9485 14.6875 52.4551 15.0247 52.8764 15.4413C53.2974 15.8579 53.6268 16.3522 53.8661 16.9277C54.117 17.5017 54.2416 18.1826 54.2416 18.9705C54.2416 19.7357 54.0759 20.4505 53.7465 21.1151C53.417 21.7798 52.9385 22.3587 52.3126 22.8545C51.6864 23.3492 50.9127 23.7445 49.9901 24.0366C49.069 24.3283 48.0154 24.4759 46.8319 24.4759C44.4538 24.4759 42.615 23.9585 41.3187 22.9228C40.0224 21.8689 39.3273 20.3776 39.2373 18.4421ZM55.5806 15.1997C55.5806 13.8153 55.7738 12.5604 56.1607 11.434C56.5474 10.2975 57.0883 9.32817 57.7816 8.52887C58.4878 7.71819 59.335 7.09412 60.3251 6.65482C61.3151 6.21551 62.4129 5.99662 63.6193 5.99662C64.8257 5.99662 65.9186 6.21059 66.8972 6.63852C67.8872 7.06645 68.7294 7.65671 69.4243 8.41205C70.1308 9.15448 70.6649 10.0445 71.0287 11.0805C71.4043 12.1165 71.5925 13.2365 71.5925 14.4409V16.62H60.1384V17.7854C60.1384 18.8439 60.4858 19.6659 61.1791 20.2513C61.8853 20.8249 62.7161 21.1121 63.6718 21.1121C64.6272 21.1121 65.4074 20.864 66.0104 20.3696C66.6137 19.8734 66.9726 19.1762 67.0857 18.2751H71.4565C71.1715 20.2334 70.3354 21.7589 68.9473 22.8515C67.5707 23.9327 65.7959 24.4725 63.6208 24.4725C62.3573 24.4725 61.2248 24.2472 60.2234 23.7965C59.2337 23.3458 58.3911 22.7153 57.6963 21.9046C57.0129 21.0942 56.4899 20.1197 56.1261 18.9834C55.7623 17.8454 55.5806 16.5843 55.5806 15.1997ZM60.1384 13.2577H67.12V12.6336C67.12 11.6658 66.7905 10.8779 66.13 10.2698C65.4698 9.66204 64.6337 9.35892 63.6208 9.35892C62.6197 9.35892 61.7886 9.66358 61.1281 10.2698C60.4675 10.8779 60.1384 11.6658 60.1384 12.6336V13.2577ZM73.3413 24.0476V6.4181H83.2945V9.79484H77.7124V24.0461H73.3413V24.0476ZM84.5828 6.4181H89.2602L93.1525 19.2008H93.2885L97.2662 6.4181H101.893L95.6274 24.0476H90.8464L84.5828 6.4181ZM101.99 15.1997C101.99 13.8153 102.183 12.5604 102.57 11.434C102.956 10.2975 103.497 9.32817 104.191 8.52887C104.897 7.71819 105.744 7.09412 106.734 6.65482C107.724 6.21551 108.822 5.99662 110.028 5.99662C111.235 5.99662 112.328 6.21059 113.306 6.63852C114.296 7.06645 115.138 7.65671 115.832 8.41205C116.538 9.15448 117.072 10.0445 117.436 11.0805C117.811 12.1165 118 13.2365 118 14.4409V16.62H106.546V17.7854C106.546 18.8439 106.893 19.6659 107.587 20.2513C108.293 20.8249 109.124 21.1121 110.079 21.1121C111.035 21.1121 111.815 20.864 112.418 20.3696C113.021 19.8734 113.38 19.1762 113.493 18.2751H117.864C117.579 20.2334 116.743 21.7589 115.355 22.8515C113.978 23.9327 112.203 24.4725 110.028 24.4725C108.765 24.4725 107.632 24.2472 106.631 23.7965C105.641 23.3458 104.799 22.7153 104.104 21.9046C103.42 21.0942 102.897 20.1197 102.534 18.9834C102.171 17.8454 101.99 16.5843 101.99 15.1997ZM106.547 13.2577H113.529V12.6336C113.529 11.6658 113.2 10.8779 112.539 10.2698C111.879 9.66204 111.043 9.35892 110.03 9.35892C109.029 9.35892 108.198 9.66358 107.537 10.2698C106.877 10.8779 106.547 11.6658 106.547 12.6336V13.2577Z"
                      fill="#F9EDDD"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <GradientContainer className="mt-16">
      <div className="flex flex-col gap-4 text-white grow">
        <span className={`${lato.className} text-xl font-bold`}>
          Did you Hire or Get Hired Using JobStash ?
        </span>
        <span className="text-md text-white/75">
          Drop us a message and tell us how it went!
        </span>
      </div>
      <HomePageButton hasBorder text="Contact" url={DUCK_TELEGRAM_URL} />
    </GradientContainer>
  </section>
);

export default memo(TestimonialSection);
