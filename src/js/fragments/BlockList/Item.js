/// HTML Output
///<li class="block-list-item" data-controller="block-list-item" data-block-list-item-url-value="{{url}}">
// <span>{{url}}</span>
// <button class="primary" data-action="block-list-item#delete">Remove</button>
// </li>
export function create(url) {
	 let urlSpan = document.createElement("span");
        urlSpan.textContent = url;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("primary");
        removeButton.setAttribute("data-action", "block-list-item#delete");

        let blockListItem = document.createElement('li');
        blockListItem.classList.add("block-list-item");
        blockListItem.setAttribute("data-controller", "block-list-item");
        blockListItem.setAttribute("data-block-list-item-url-value", url);

        blockListItem.appendChild(urlSpan);
        blockListItem.appendChild(removeButton);

        return blockListItem;
}