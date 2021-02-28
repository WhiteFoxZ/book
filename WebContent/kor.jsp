<%@ page language="java" contentType="text/html; charset=UTF-8"%>

    <%

    //pageEncoding="UTF-8"

    String id = request.getParameter("id");


    System.out.println(id);


    id = new String(id.getBytes("8859_1"), "UTF-8");


    System.out.println(id);






    %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%=id %>
</body>
