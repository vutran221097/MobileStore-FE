import React from 'react';
import './AddNews.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import url from '../../setup';
import authHeader from '../../services/auth-header';

const styles = {
    reactQuill: {
        height: "300px",
        overflow: 'hidden',
    },
    titleInput: {
        marginTop: "2rem",
        fontSize: "25px",
        fontWeight: "bold"
    }
}


class AddNews extends React.Component {

    state = {
        body: null,
        title: "",
    }

    componentDidMount() {
        if (this.props.idNewsEdit) this.getNewsEdit();
    }

    componentDidUpdate(prevProps) {
        if (this.props.idNewsEdit && prevProps.idNewsEdit !== this.props.idNewsEdit)
            this.getNewsEdit();
        if (!this.props.idNewsEdit && prevProps.idNewsEdit !== this.props.idNewsEdit)
            this.setState({
                title: "",
                body: null
            })
    }

    async getNewsEdit() {
        try {
            const res = await axios.get(`${url}/news/${this.props.idNewsEdit}`);
            this.setState({
                body: res.data.body,
                title: res.data.title,
            })
        } catch (err) {
            console.log(err);
        }
    }

    imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

            // Save current cursor state
            const range = this.quill.getEditor().getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.getEditor().insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.getEditor().setSelection(range.index + 1);

            try {
                const res = await this.postImages(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
                // Remove placeholder image
                this.quill.getEditor().deleteText(range.index, 1);

                // Insert uploaded image
                this.quill.getEditor().insertEmbed(range.index, 'image', `${url}/${res.data.file}`);
                //this.quill.getEditor().insertEmbed(range.index, 'image', res);
            } catch (error) {
                console.log(error);
            }
        };
    }

    postImages = async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                headers: { 'content-type': 'multipart/form-data' },
                data: data,
                url: `${url}/news/image`,
            })
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    onChangeBody = (newText) => this.setState({ body: newText });
    onChangeTitle = (e) => this.setState({ title: e.target.value });

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!this.props.idNewsEdit) {
                const res = await axios.post(`${url}/news`, {
                    body: this.state.body,
                    title: this.state.title,
                },{ headers: authHeader()})
                
                if (res.status === 201) {
                    this.setState({
                        title: "",
                        body: null,
                    });
                    this.props.addNews(res.data)
                    this.props.closeForm();
                }
            } else {
                const res = await axios.put(`${url}/news/${this.props.idNewsEdit}`, {
                    body: this.state.body,
                    title: this.state.title,
                },{headers: authHeader()})
                if (res.status === 200) {
                    this.props.handleUpdateNews(this.state);
                    this.setState({
                        title: "",
                        body: null,
                    });
                    this.props.closeForm();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    onOpenForm = () => {
        this.props.toggle(!this.props.active);
        this.setState({
            title: "",
            body: null
        })
    }

    render() {
        // const today = new Date();
        const { closeForm } = this.props;
        return (
            <div className={this.props.active ? "addModal addModalActive" : "addModal"}>
                {JSON.stringify(this.state.editorHtml)}
                <div className="addModalContent">
                    <span className="close" onClick={closeForm}><FontAwesomeIcon icon={faTimes} /></span>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" style={styles.titleInput}>Tittle</label>
                        <input value={this.state.title} onChange={this.onChangeTitle} className="form-control" type="text" placeholder="Tittle" required />
                    </div>
                    <ReactQuill theme="snow"
                        ref={el => {
                            this.quill = el;
                        }}
                        style={styles.reactQuill}
                        value={this.state.body}
                        placeholder="Nhập nội dung bài viết..."
                        modules={{
                            toolbar: {
                                container: [
                                    ["bold"],
                                    ["italic"],
                                    ["underline"],
                                    ["blockquote"],
                                    ["code"],
                                    [{ align: [] }],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["link"],
                                    ["image"],
                                    ["video"],
                                ],
                                handlers: {
                                    image: this.imageHandler
                                }
                            }
                        }}
                        formats={formats}
                        onChange={this.onChangeBody}
                    />
                    <div className="form-group">
                        <button className="form-control btn btn-primary" type="submit">
                            {this.props.idNewsEdit ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>

        );
    }
}


const formats = [
    "align",
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code",
];


export default AddNews;