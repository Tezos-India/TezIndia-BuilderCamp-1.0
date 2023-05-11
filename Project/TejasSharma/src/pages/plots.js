import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../2.jpg'
import img2 from '../3.jpg'

const Blogs = () => {
return (
	<div className="container-fluid d-flex justify-content-center">
	<div className='row'>
		<div className='col-md-4'>
			<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src={img2} width={350} height={250} />
			<Card.Body>
				<Card.Title>ValmarkA102</Card.Title>
				<Card.Text>
				This beautiful house costs 5 mutez.
				</Card.Text>
			</Card.Body>
			</Card>
		</div>
		<div className='col-md-4'>
			<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src={img1} width={350} height={250}/>
			<Card.Body>
				<Card.Title>ValmarkA101</Card.Title>
				<Card.Text>
				This beautiful house costs 4 mutez.
				</Card.Text>
			</Card.Body>
			</Card>
		</div>

	</div>
	</div>
	);
}

export default Blogs;
