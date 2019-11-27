class WriteButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var btnStyle = {
            float: 'right',
            margin:"0 0 20px 0"
        }
       return(
           <div>
               <a href="/sale_post" style={btnStyle} className="btn1">판매글 작성</a>     
           </div>
       )
    }
}
ReactDOM.render(<WriteButton />, document.getElementById('sale_write_btn'));