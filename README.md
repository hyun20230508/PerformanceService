src 디렉토리로 경로 지정
cd ./src

<실행>
npx ts-node app.ts

---

<api 경로>

회원가입
post '/api/signup'

로그인
post '/api/signin'

로그아웃
post '/api/signout'

내 프로필 확인
get '/me'

내 예약목록 확인
get '/myreservation'

새 공연 등록
post '/show'

공연 목록 확인 및 검색
get '/show'

공연 정보 상세 보기(잔여 좌석 수 표시)
get '/show/:showId'

공연 예매
post '/show/:showId/seat/:seatId/reservation'

공연 예매 취소
delete '/show/:showId/seat/:seatId/reservation/:reservationId'
