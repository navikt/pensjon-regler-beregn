import GuiModelMetadata from "./GuiModelMetadata.ts";

export type GuiModel = {
    request?: any[];
    response?: any[];
    metadata?: GuiModelMetadata;
    fromFile?: boolean;
}