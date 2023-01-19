import { Router } from 'express'

const router = Router()



router.get('/', (req, res) => res.render('index', {title: 'Home '}))

router.get('/about', (req, res) => res.render('about', {title: 'Conoceme'}))

router.get('/contact', (req, res) => res.render('contact', {title: 'Contactame'}))


export default router