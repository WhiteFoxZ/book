package com.book;

import java.sql.Connection;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;

import org.apache.log4j.Logger;

import com.ems.common.dbcp.DBManager;
import com.ems.common.dbcp.DataSource;
import com.ems.common.util.EmsDateUtil;
import com.ems.common.util.EmsHashtable;
import com.ems.common.util.QueryXMLParser;;


public class BOOKLIST {

	ServletRequest request = null;

	private static Logger log = Logger.getLogger(BOOKLIST.class.getName());


	static HashMap<String, String> map1 = new HashMap();
	EmsHashtable userinfo=null;

	DBManager dbm=null;
	DataSource ds =null;

	public BOOKLIST(ServletContext application, ServletRequest request, EmsHashtable userinfo ) {
		this.request = request;
		this.userinfo = userinfo;

		ds = (DataSource)application.getAttribute("jdbc/mysql_book");

		dbm = new DBManager(ds);


		// P_CARD_ID 100 이상 일때 종일권으로 계산
		// P_CARD_ID 200 이상 일때 (과자값으로 세팅)

		map1.put("200", "700"); // 700원
		map1.put("201", "800");
		map1.put("202", "900");
		map1.put("203", "1000");
		map1.put("204", "1100");
		map1.put("205", "1200");
		map1.put("206", "1300");
		map1.put("207", "1400");
		map1.put("208", "1500");
		map1.put("209", "1600");
		map1.put("210", "1700");
		map1.put("211", "1800");
		map1.put("212", "1900");
		map1.put("213", "2000");
		map1.put("214", "2100");
		map1.put("215", "2200");
		map1.put("216", "2300");
		map1.put("217", "2400");
		map1.put("218", "2500");
		map1.put("219", "2600");
		map1.put("220", "2700");
		map1.put("221", "2800");
		map1.put("222", "2900");
		map1.put("223", "3000");

		list();

	}

	public void list() {

		/*
		 * 종료일자가 저녁12시가 넘었을때 계산안되는문제
		 */

		String P_CARD_ID = request.getParameter("P_CARD_ID"); // 카드ID
		String BOOK_SALES_ID = "";
		String TO_DAY = EmsDateUtil.getCurrentDate("yyyy-MM-dd");
		String CARD_ID = "";
		String START_TIME = "";
		String END_TIME = "";
		String WROK_PAY = "";
		String WORK_HH = "";
		String WORK_MIN = "";
		String MSG = "";
		String audio = "";

		String LOGINID = userinfo.getString("LOGINID");

		Connection con =null;


		try {

			con = dbm.getConnection();

			EmsHashtable[] hash = dbm.selectMultipleRecord(con,"select * from book_sales where card_id=? and LOGINID=? and START_TIME is not null and END_TIME IS NULL AND CARD_ID<200 ",
					new String[] { P_CARD_ID, LOGINID });
			// 현재날짜, 카드ID, END_TIME IS NULL 로 데이타 가 있는지 조회해서 데이타가 있으면 들어오셨습니다 메시지를 뿌린다.


			if (hash != null && hash.length > 0) {	// 손님나갈때 처리

				BOOK_SALES_ID = hash[0].getString("BOOK_SALES_ID");

				dbm.update(con, "UPDATE book_sales set END_TIME = NOW()  where BOOK_SALES_ID =? ", new String[] {	BOOK_SALES_ID });

				hash = dbm.selectMultipleRecord(con, QueryXMLParser.getQuery(
						this.getClass(), "book.xml", "query3"),
						new String[] { BOOK_SALES_ID,LOGINID,LOGINID,LOGINID,LOGINID });

				WROK_PAY = hash[0].getString("WROK_PAY");
				WORK_HH = hash[0].getString("WORK_HH");
				WORK_MIN = hash[0].getString("WORK_MIN");

				int intCardId = Integer.parseInt(P_CARD_ID);

				if (intCardId >= 100 && intCardId < 200) {// 종일권 계산
					dbm.update(
							con,
							"UPDATE book_sales set WORK_HH=?,  WORK_MIN=?  where book_sales_ID =? ",
							new String[] { WORK_HH, WORK_MIN, BOOK_SALES_ID });
					MSG = "<B>(종일권)</B><BR>" + P_CARD_ID + " 번<BR> 나가셨습니다.";
				} else {// 일일권계산
					dbm.update(
							con,
							"UPDATE book_sales set WROK_PAY = ? ,WORK_HH=?,  WORK_MIN=?  where BOOK_SALES_ID =? ",
							new String[] { WROK_PAY, WORK_HH, WORK_MIN,
									BOOK_SALES_ID });
					MSG = "손님 " + P_CARD_ID + " 번<BR> 나가셨습니다.";
				}
				audio = "goodbye.mp3";

				// 오전/오후로 변경
				hash = dbm.selectMultipleRecord(QueryXMLParser.getQuery(
						this.getClass(), "book.xml", "query4"),
						new String[] { BOOK_SALES_ID });

				CARD_ID = hash[0].getString("CARD_ID");
				START_TIME = hash[0].getString("START_TIME");
				END_TIME = hash[0].getString("END_TIME");
				WROK_PAY = hash[0].getString("WROK_PAY");
				WORK_HH = hash[0].getString("WORK_HH");
				WORK_MIN = hash[0].getString("WORK_MIN");

			} else { // 처음 들어오셨습니다 했을때 처리

				if (P_CARD_ID != null && !P_CARD_ID.equals("")) {
					StringBuffer q2 = new StringBuffer("");

					//hash = dbm.selectMultipleRecord("select to_char(sysdate,'YYYY/MM/DD AMHH:MI') as NOW  from dual ",new String[] {});
					hash = dbm.selectMultipleRecord(con,"select DATE_FORMAT(NOW(),'%p %h:%i') as NOW",new String[] {});

					CARD_ID = P_CARD_ID;
					START_TIME = hash[0].getString("NOW");

					// card id 100~ 이상이면 종일사용자, 200~이상이면 이면 과자값으로 계산
					int intCardId = Integer.parseInt(P_CARD_ID);

					if (intCardId >= 100 && intCardId < 200) {// 종일권 계산

						q2.append("insert into book_sales (TO_DAY,CARD_ID,START_TIME,WROK_PAY, LOGINID) values (?,?,CURRENT_TIMESTAMP, (SELECT CD_MEANING FROM book_code where CD_GROUP_ID='BOOK_1DAY_RATE' and cd_id=?) ,? ) ");

						dbm.insert(con, q2.toString(), new String[] { TO_DAY,P_CARD_ID, LOGINID , LOGINID });

						MSG = "<B>(종일권)</B><BR> " + CARD_ID + " 번<BR> 들어오셨습니다.";
						audio = "welcome_all.mp3";

					} else if (intCardId >= 200 && intCardId <= 223) { // 과자값 계산

						WROK_PAY = map1.get(P_CARD_ID).toString(); // 200 이오면
																	// 700 리턴
						q2.append("insert into book_sales (TO_DAY,CARD_ID,START_TIME,WROK_PAY, LOGINID) values (?,?,CURRENT_TIMESTAMP,?, ?  ) ");
						dbm.insert(con, q2.toString(), new String[] { TO_DAY,P_CARD_ID, WROK_PAY, LOGINID });

						MSG = "과자 " + WROK_PAY + " 원<BR>계산하였습니다.";
						audio = "calculate.mp3";

					} else if (intCardId < 100) { // 일반인 계산

						q2.append("insert into book_sales (TO_DAY,CARD_ID,START_TIME,LOGINID) values (?,?,CURRENT_TIMESTAMP,?  ) ");
						dbm.insert(con, q2.toString(), new String[] { TO_DAY,P_CARD_ID,LOGINID });

						MSG = "손님 " + CARD_ID + " 번<BR> 들어오셨습니다.";
						audio = "welcome.mp3";
					}



				}

			}

			dbm.commitChange(con);

			request.setAttribute("TO_DAY", TO_DAY);
			request.setAttribute("BOOK_SALES_ID", BOOK_SALES_ID);
			request.setAttribute("CARD_ID", CARD_ID);
			request.setAttribute("START_TIME", START_TIME);
			request.setAttribute("END_TIME", END_TIME);
			request.setAttribute("WROK_PAY", WROK_PAY);
			request.setAttribute("WORK_HH", WORK_HH);
			request.setAttribute("WORK_MIN", WORK_MIN);
			request.setAttribute("MSG", MSG);
			request.setAttribute("audio", audio);


			hash = dbm.selectMultipleRecord(QueryXMLParser.getQuery(this.getClass(), "book.xml", "query5"),new String[] {LOGINID});

			request.setAttribute("hash", hash);

		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			log.debug(ds);
		}

	}

}
