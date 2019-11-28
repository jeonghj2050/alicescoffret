
window.$ = window.jQuery = jQuery;

class WriteButton extends React.Component {
    render() {
        var btnStyle = {
            float: 'right',
            margin: "0 0 20px 0",
            color: "white"
        }
<<<<<<< HEAD
=======
        console.log("1")
>>>>>>> e3731854baff5c6c71da1b3d597cb41d21a9e6b6
        return (
            <div>
                <a href="/sale_post" style={btnStyle} className="btn1">판매글 작성</a>
            </div>
        )
    }
}
<<<<<<< HEAD
class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            all_list:all_list,
            earring_list:earring_list,
            ring_list:ring_list,
        };  
    }
    createList = () => {
        var category = ["All", "Earring", "Ring"];
        let itemList = [];
        //style 변수
        var img_style={
            width:'300',
            height:'170'
        }
        var textColor={
            color: '#6a3cff'
        }
        console.log('1')
        //카테고리별 데이터 저장
        for (var k = 0; k < category.length; k++) {
            var item=[]
            var list = []; 
            if (category[k] == "All") {
                list = this.state.all_list;
            }
            else if (category[k] == "Earring") {
                list = this.state.earring_list
            } else if (category[k] == "Ring") {
                list = this.state.ring_list
            }
            for (var i = 0; i < list.length; i++) {  
                for (var j = 0; j < list[i].tag.length; j++) {
                    var tagList = []
                    var tag = list[i].tag[j]
                    var tag_code;
                    if (tag == "봄") {
                        tag_code = "tag_spring"
                    } else if (tag == "여름") {
                        tag_code = "tag_summer"
                    } else if (tag == "가을") {
                        tag_code = "tag_fall"
                    } else if (tag == "겨울") {
                        tag_code = "tag_winter"
                    } else if (tag == "큐트") {
                        tag_code = "tag_cute"
                    } else if (tag == "화려") {
                        tag_code = "tag_brilliant"
                    } else if (tag == "우아") {
                        tag_code = "tag_luxury"
                    } else if (tag == "심플") {
                        tag_code = "tag_simple"
                    }
                    tagList.push(<span className={tag_code}>{list[i].tag[j]}</span>)
                }
                //글 한개
                item.push(
                    <article id="" className="location-listing">
                        <div className="location-image">
                            <a href="#" className="portfolio-link" data-toggle="modal"
                                onclick="javascript:window.location='/product/detail?productId={list[i]._id}'">
                                <img src={list[i].thumbnail} style={img_style} />
                            </a>
                        </div>
                        <div className="portfolio-caption">
                            <h4>{list[i].product_name}</h4>
                            <p className="text-muted">
                                {list[i].name}
                            </p>
                        </div>
                        <div class="tag_box">
                            {tagList}
                        </div>
                    </article>
                );
                console.log(item.length+"   "+category[k])
            }
            itemList.push(
                <div className="tab_container">
                    <div id={category[k]} className="tab_content">
                        <div class="grid-container">
                            {item}
                        </div>
                    </div>
                </div>
            );
        }
        return itemList
    }
    render() {
        console.log('4')
        var category = ["All", "Earring", "Piercing", "Ring", "Wristband", "Necklace", "Choker", "Clock", "Brooch", "Hairclip"];
        return (
            <div>
                <div className="child-page-listing">
                    <h2></h2>
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
                    <div>
                        {this.createList()}
                    </div>
=======
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
>>>>>>> e3731854baff5c6c71da1b3d597cb41d21a9e6b6
                </div>
            </div>
        )
    }
}
<<<<<<< HEAD
ReactDOM.render(<List />, document.getElementById('list_box')); 
=======

ReactDOM.render(<TagBox />, document.getElementById('sale_list'));
>>>>>>> e3731854baff5c6c71da1b3d597cb41d21a9e6b6
