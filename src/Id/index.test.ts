// id.test.ts
import Id from '.';

describe('Id', () => {
    it('should create a valid ID', () => {
        // Act
        const id = Id.makeId();

        // Assert
        expect(id).toBeDefined();
        expect(Id.isValidId(id)).toBe(true);
    });

    it('should validate a valid ID', () => {
        // Arrange
        const validId = '3cb252d396292d55477c1841ebce5d7c';

        // Act
        const isValid = Id.isValidId(validId);

        // Assert
        expect(isValid).toBe(true);
    });

    it('should invalidate an invalid ID', () => {
        // Arrange
        const invalidId = 'invalidId';

        // Act
        const isValid = Id.isValidId(invalidId);

        // Assert
        expect(isValid).toBe(false);
    });
});
