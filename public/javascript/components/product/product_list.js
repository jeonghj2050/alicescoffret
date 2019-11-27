
window.$ = window.jQuery = jQuery;

class WriteButton extends React.Component {
    render() {
        var btnStyle = {
            float: 'right',
            margin: "0 0 20px 0",
            color: "white"
        }
        console.log("1")
        return (
            <div>
                <a href="/sale_post" style={btnStyle} className="btn1">판매글 작성</a>
            </div>
        )
    }
}
// 클래스명은 대문자만 인식!!
class TagBox extends React.Component  {
    render() {
        console.log("2")
        var category = ["All", "Earring", "Piercing", "Ring", "Wristband", "Necklace", "Choker", "Clock", "Brooch", "Hairclip"];
        return (
            <div>
                <WriteButton></WriteButton>
                <div className="tabs_box">
                    <ul className="tabs">
                        <li className="active" rel={category[0]} name={category[0]}>전체</li>
                        <li rel={category[1]} name={category[1]}>귀걸이</li>
                        <li rel={category[2]} name={category[2]}>피어싱</li>
                        <li rel={category[3]} name={category[3]}>반지</li>
                        <li rel={category[4]} name={category[4]}>팔찌</li>
                    </ul>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<TagBox />, document.getElementById('sale_list'));