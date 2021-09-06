import React from 'react'
import Styled from 'styled-components';

export default function Home() {
	return (
	  <Container>
		  <div>
			  ברוכים הבאים לממשק הניהול שלכם!
		  </div>
		  <div>
			  כאן תוכלו לנהל את תוכן האתר באופן קל ופשוט
		  </div>
		  <div>
			אתם כעת בעמוד הבית - תוכלו לחזור לכאן כדי לקרוא שוב על מבנה האתר
		  </div>
		  <div>
			  בעמוד האריחים - תוכלו להוסיף אריחים חדשים ולערוך פרטים של אריחים קיימים
		  </div>
		  <div>
			  בעמוד התמונות - תוכלו
		  </div>
		  <div>
			  בעמוד עריכת המידע - תוכלו לערוך את קטעי הטקסט באתר, לדוגמה ״אודותינו״ וטקסטים נוספים באתר הבית
		  </div>
	  </Container>
	)
}

const Container = Styled.div`
padding: 0 50px 0 50px;
line-height: 1.6;
height: 80vh;
font-size: 0.8em;
display: flex;
flex-direction: column;
gap: 20px;
`