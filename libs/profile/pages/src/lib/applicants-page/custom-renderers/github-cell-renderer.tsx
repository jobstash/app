import {
  CustomCell,
  CustomRenderer,
  getMiddleCenterBias,
  GridCellKind,
  measureTextCached,
} from '@glideapps/glide-data-grid';

interface GithubCellProps {
  readonly kind: 'github-cell';
  readonly image: string;
  readonly username: string;
}

export type GithubCell = CustomCell<GithubCellProps>;

export const githubCellRenderer: CustomRenderer<GithubCell> = {
  kind: GridCellKind.Custom,
  isMatch: (cell: CustomCell): cell is GithubCell =>
    (cell.data as GithubCellProps).kind === 'github-cell',
  draw(args, cell) {
    const { ctx, rect, theme, imageLoader, col, row } = args;
    const { image, username } = cell.data;

    const xPad = theme.cellHorizontalPadding;
    const radius = rect.height / 2 - theme.cellVerticalPadding;
    const drawX = rect.x + xPad;

    const imageResult = imageLoader.loadOrGetImage(image, col, row);

    ctx.save();
    ctx.beginPath();
    ctx.arc(drawX + radius, rect.y + rect.height / 2, radius, 0, Math.PI * 2);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#F1D86E';
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = `600 16px ${theme.fontFamily}`;
    const startChar = username[0];
    const metrics = measureTextCached(startChar, ctx);
    ctx.fillText(
      startChar,
      drawX + radius - metrics.width / 2,
      rect.y +
        rect.height / 2 +
        getMiddleCenterBias(ctx, `600 16px ${theme.fontFamily}`),
    );

    if (imageResult !== undefined) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(drawX + radius, rect.y + rect.height / 2, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.drawImage(
        imageResult,
        drawX,
        rect.y + rect.height / 2 - radius,
        radius * 2,
        radius * 2,
      );

      ctx.restore();
    }

    ctx.font = theme.baseFontFull;
    ctx.fillStyle = theme.textDark;
    ctx.fillText(
      username,
      drawX + radius * 2 + xPad,
      rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme),
    );

    ctx.restore();

    return true;
  },
};
