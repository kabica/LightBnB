INSERT INTO users (name, email, password) 
VALUES 
('Abe', 'abraham.lincoln@gmail.com', ' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Joan', 'j.ofDaArk@gmail.com', ' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Zeuss', 'notPoseidon@gmail.com', ' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kermit', 'missPiggy@gmail.com', ' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ricky', 'Bobby@gmail.com', ' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO reservations (start_date, end_date) (
VALUES 
('2018-09-11', '2018-09-22'), 
('2019-08-17', '2017-08-29'),
('2018-01-01', '2018-01-09')
);

INSERT INTO property_reviews (rating, message)
VALUES 
(5, 'What a great place!'),
(1, 'What a bad place!'),
(3, 'meh.');

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
('The Awesome Spot', 'description', 'https://web.compass.lighthouselabs.ca/days/w05d3/activities/955', 'https://web.compass.lighthouselabs.ca/days/w05d3/activities/955', 200, 4, 1, 2, 'Canada', 'The Avenue','Calgary', 'Alberta', 't2y1c5'),
('The Spot', 'description', 'https://web.compass.lighthouselabs.ca/days/w05d3/activities/955', 'https://web.compass.lighthouselabs.ca/days/w05d3/activities/955', 199, 2, 2, 2, 'Canada', 'The Other Avenue','Calgary', 'Alberta', 't2x1u5'),
('Bedtime', 'description', 'https://web.compass.lighthouselabs.ca/days/w05d3/activities/955', 'https://web.compass.lighthouselabs.ca/days/w05d3/activities/955', 201, 3, 1, 2, 'Canada', 'The Other Street','Calgary', 'Alberta', 't2r4u5');