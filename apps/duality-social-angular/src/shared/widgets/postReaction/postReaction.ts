import { Component } from "@angular/core";
import { DefaultReactionsArray, IReactionArrayEntry } from "@duality-social/duality-social-lib";

@Component({
    selector: 'app-post-reaction',
    templateUrl: './postReaction.html',
    styleUrls: ['./postReaction.css']
})
export class PostReactionComponent {

    public readonly reactionsArray: IReactionArrayEntry[] = DefaultReactionsArray;

}