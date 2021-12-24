import axios from 'axios';

const API_URL = 'http://localhost:3001';
const token = sessionStorage.getItem('token');

const instance =  axios.create({
	baseURL: API_URL,
	headers: {'Authorization': 'Bearer '+ token}
});

const login = async (email, password) => {
	try {
		const rep = await axios.post(`${API_URL}/user/login`, {
			email,
			password
		});
		const token = rep.data;
		sessionStorage.setItem('token', token);
		return token != null;
	} catch (e) {
		switch (e.reponse.status) {
		case 400: 
			throw new Error('L\'email et le mot de passe sont obligatoires');
		case 404: 
			throw new Error('L\'email ou/et le mot de passe est/sont incorrect(s)');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const createData = async (path, value) => {
	try {
		const rep = await instance.post(path, value);
		return rep.data;
	} catch (e) {
		throw new Error(e.message);
	}
};

const getDatas = async (path, size = 15, page = 0) => {
	try {
		const rep = await instance.get(path, {
			params: {
				size, 
				page: page
			}
		});

		return rep.data;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateData = async (path, id, value) => {
	try {
		const rep = await instance.patch(path, { id, ...value });
		return rep.data;
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteData = async (path, id) => {
	try {
		const rep = await instance.delete(path, { data: { id } });
		return rep.data;
	} catch (e) {
		throw new Error(e.message);
	}
};

const emptyTrash = async (trash_id, were_real_reports) => {
	try {
		const rep = await instance.post('/trash/empty', { trash_id, were_real_reports });
		return rep.data;
	} catch (e) {
		throw new Error(e.message);
	}
};

export { createData, updateData, deleteData, getDatas, emptyTrash, login };