TRUNCATE users, properties, reservations, property_reviews RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, email, password) 
VALUES (1, 'Barbara Santos', 'faulknermark@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(2, 'Christian Simpson', 'dawnbanks@mccoy-beck.biz', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(3, 'Rebecca Wallace', 'mrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(4, 'Heather Hunt', 'lolson@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(5, 'Sarah Weber', 'andersonangel@williams.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(6, 'Darlene Williams', 'williamschristopher@harris.org', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(7, 'Rachel Morrison', 'martindaniel@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(8, 'Anthony Williams', 'bruce60@jensen.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(9, 'William French', 'fedwards@johnson-vazquez.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(10, 'Sean Morales', 'michael12@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 3, 'Record treat.', 'Somebody exist spring generation change source. Cause marriage paper organization could seek reality. Wonder response nature play baby.', 'https://www.lorempixel.com/61/262', 'https://www.lorempixel.com/730/728', 336, 5, 2, 4, 'Saint Pierre and Miquelon', '62058 Williamson Radial Apt. 323', 'New Troy', 'Alabama', '88804', True),
(2, 5, 'Fast prepare.', 'Keep whose clearly fact common fund stock. Say ok travel give.
Everybody course impact issue. Message product write interview city soldier pretty.', 'https://placekitten.com/686/553', 'https://placeimg.com/148/94/any', 79, 2, 4, 5, 'Korea', '299 Harris Turnpike', 'Phillipshaven', 'Louisiana', '60642', True),
(3, 3, 'No year.', 'Fast pattern treat. Turn turn begin attorney from.
Unit take throughout send. Attention according move performance outside none ok those. Clear represent newspaper still lawyer support tree.', 'https://www.lorempixel.com/932/945', 'https://placeimg.com/363/300/any', 106, 3, 1, 1, 'Mali', '233 Stewart Circles', 'Valeriestad', 'Hawaii', '57045', True),
(4, 8, 'Class sister unit.', 'Many another idea computer place audience. Recognize stock become economy same weight tonight middle.
All she enough under know. Door over investment laugh responsibility.', 'https://placeimg.com/808/586/any', 'https://placekitten.com/197/347', 74, 0, 4, 2, 'Saint Pierre and Miquelon', '344 Sandoval Curve Suite 665', 'Castanedaville', 'California', '27809', True),
(5, 8, 'Senior.', 'Minute significant discussion anyone south soon new. Throw order table fish recognize building.
Eye me serve own speech it strong. Like marriage rest seem statement.', 'https://dummyimage.com/574x974', 'https://www.lorempixel.com/87/684', 293, 0, 2, 2, 'Honduras', '7085 James Center Suite 191', 'West Aaron', 'Nebraska', '43275', False),
(6, 3, 'Yeah player so.', 'View make design write simple sign.
Challenge walk theory visit beyond. Somebody mission community season.', 'https://placekitten.com/936/349', 'https://www.lorempixel.com/515/114', 56, 1, 1, 1, 'Kyrgyz Republic', '4415 Mary Courts', 'Porterbury', 'Tennessee', '67668', True),
(7, 1, 'Father but add.', 'Season test hear ready particular strong safe per. Full month city a politics sister.
Scene kind among Democrat know else.', 'https://placekitten.com/694/139', 'https://www.lorempixel.com/761/761', 220, 3, 2, 4, 'Montserrat', '36834 Vasquez Lodge', 'Ericview', 'Arkansas', '55921', True),
(8, 8, 'Center color.', 'Form there fast drop scientist. Own around deep well response south.
Economic stand any give. Quite soon every page mother boy. Ago need charge near spend nearly real.', 'https://placeimg.com/899/263/any', 'https://placekitten.com/551/973', 79, 2, 1, 2, 'Guernsey', '954 Benson Expressway Apt. 085', 'Valerieburgh', 'Alabama', '30028', False),
(9, 4, 'Whose thing.', 'Life win protect government production evidence. History night star method effort bed fly serve. Go will drop go. Street heavy line want worker dog.', 'https://dummyimage.com/822x544', 'https://www.lorempixel.com/25/660', 388, 5, 4, 3, 'Korea', '77964 Evelyn Estates', 'Nguyenhaven', 'Maryland', '67924', True),
(10, 7, 'Different conference whom.', 'Available break sign bag. Admit believe never room should. Poor plant attorney somebody if space really.
Probably open animal answer. Whether themselves pretty reduce.', 'https://dummyimage.com/800x611', 'https://dummyimage.com/83x667', 404, 0, 2, 5, 'Wallis and Futuna', '0412 Laura Forge', 'Michaelstad', 'Oregon', '16481', False);


INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) 
VALUES (1, '2025-01-01', '2025-01-02', 9, 6),
(2, '2025-01-01', '2025-01-02', 10, 7),
(3, '2025-01-01', '2025-01-02', 8, 8),
(4, '2025-01-02', '2025-01-01', 9, 6),
(5, '2025-01-01', '2025-01-02', 1, 4),
(6, '2025-01-02', '2025-01-02', 3, 2),
(7, '2025-01-01', '2025-01-02', 10, 7),
(8, '2025-01-02', '2025-01-02', 10, 6),
(9, '2025-01-02', '2025-01-02', 3, 6),
(10, '2025-01-02', '2025-01-02', 4, 9);


INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) 
VALUES 
(1, 10, 6, 1, 3, 'Soldier black artist evidence accept area new. Across remain friend land hotel ever. Section drug offer free yard land. Who cup provide civil yeah debate. Treat letter understand beat give large.'),
(2, 4, 7, 2, 4, 'Before wall own would himself full. Toward medical tell answer skin national listen. Big your action pressure event street. Congress method authority protect wait street.'),
(3, 8, 7, 3, 5, 'Activity likely wish. Think discuss sometimes everybody leader million. Arrive choose many agree.'),
(4, 4, 7, 3, 5, 'Husband final effect view interest. Particular time baby PM. Issue rather seven million radio trade. Ball air fish beat likely other. Simple police certain enough age never.'),
(5, 1, 7, 3, 3, 'Foot toward whose first how home score. Authority fear pay make. Manage very hotel fall perform.'),
(6, 9, 8, 4, 3, 'Time ok TV recently reach. His soon country century what watch. Fly stuff sense group. Plan medical why read watch response. Respond partner PM know. Easy item wife lose on.'),
(7, 10, 2, 5, 1, 'Will everybody record include event. Probably cell too trial manage else Republican. Land than get nation evidence herself activity.'),
(8, 6, 5, 6, 5, 'Little author want accept education. Star material several join two radio.'),
(9, 6, 4, 7, 5, 'Dinner between report produce sister often social. Various could agency how. Almost eat themselves. But training ability movie. Final two model particular. Lay cut test company.'),
(10, 4, 3, 8, 5, 'Move others ground successful hotel line can. Election budget list after by write. Behind have art whether. Nice begin perform thus bring.');