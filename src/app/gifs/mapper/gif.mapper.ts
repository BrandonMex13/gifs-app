import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  static mapGifyItemToGif( giphyItem : GiphyItem) : Gif {
    return {
      id    : giphyItem.id,
      title : giphyItem.title,
      url   : giphyItem.images.original.url
    }
  }

  static mapGifyItemsToGifArray( giphyItems : GiphyItem[]) : Gif[] {
    return giphyItems.map( this.mapGifyItemToGif );
  }
}
