import User from '../models/user';

const UserController = {};

UserController.getAll = async (req, res) => {
    try {
        await User.find().sort('-dateAdded').exec((err, users) => {
            if (err) {
                res.status(500).send(err);
            }
            return res.json({
                users,
            });
        });
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            message: err.message,
            error: err
        });
    }
};

UserController.getUser = async (req, res) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.json({err: 'loi'});
        }
        let user = await User.findById(id);
        return res.json ({
            isSuccess: user ? true:false,
            user
        });
    } catch (error) {
        return res.json({err: error})
    }

};
UserController.addUser = async (req, res) => {
    try {
        const user = new User({
            ...req.body
        });
        await user.save();
        return res.json({
            isSuccess: true,
            user: user
        })
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            message: err.message,
            error: err
        });
    }
};

UserController.updateUser = async (req, res) => {
    try {
        let { refNames, firstName, gender, email, age } = req.body;
        let id = req.params.id;
        if(!id) {
            return res.json({messages : 'loi'});
        }
        let user = await User.findByIdAndUpdate({_id:id});
        return res.json({message: "update thanh cong"});

    } catch (error) {
        return res.json({message: "that bai"});
    }

};

UserController.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.json({message: 'err'});
        }
        let user = await User.findByIdAndRemove({_id:id});
        if(user) {
            return res.json({message: 'xoa thanh cong'});
        }
    } catch (error) {
        return res.json({message: error});
    }

};
export default UserController;
